import "./CartPage.scss";
import CartBook from "./CartBook";
import { useStoreActions, useStoreState } from "easy-peasy";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
ReactModal.setAppElement("#root");

const CartPage = () => {
    const isCartLoading = useStoreState((state) => state.isCartLoading);
    const bookInCart = useStoreState((state) => state.bookInCart);
    const setBookInCart = useStoreActions((actions) => actions.setBookInCart);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const [isSaveCartError, setIsSaveCartError] = useState(false);
    const navigate = useNavigate();

    const createOrder = (bookList) => {
        const controller = new AbortController();

        const createOrderAxios = async () => {
            try {
                await axiosPrivate.post("/order", bookList, {
                    signal: controller.signal,
                });

                const newCart = bookInCart.filter((book) => !book.active);
                setBookInCart(newCart);

                const toastId = "createOrderToastSuccessId";
                if (!toast.isActive(toastId)) {
                    toast.success("訂單已送出", {
                        toastId: toastId,
                        autoClose: 1000,
                    });
                } else {
                    toast.update(toastId, {
                        autoClose: 1000,
                    });
                }
                navigate("/orders");
            } catch (err) {
                const toastId = "createOrderToastErrorId";
                if (!toast.isActive(toastId)) {
                    toast.error("訂單送出失敗", {
                        toastId: toastId,
                        autoClose: 1000,
                    });
                } else {
                    toast.update(toastId, {
                        autoClose: 1000,
                    });
                }
                console.log(`Error: ${err.message}`);
            }
        };

        createOrderAxios();

        return () => {
            controller.abort();
        };
    };

    const handleSubmit = () => {
        const orderBookList = bookInCart.filter((book) => book.active);
        if (orderBookList.length) {
            // format
            const formatOrderBookList = orderBookList.map((book) => ({
                book: book.book,
                quantity: book.quantity,
            }));

            createOrder(formatOrderBookList);
        } else {
            setModalIsOpen(true);
        }
    };

    useEffect(() => {
        if (isSaveCartError) {
            const toastId = "updateCartToastErrorId";
            if (!toast.isActive(toastId)) {
                toast.error("購物車更改失敗", {
                    toastId: toastId,
                    autoClose: 1000,
                });
            } else {
                toast.update(toastId, {
                    autoClose: 1000,
                });
            }
            setIsSaveCartError(false);
        }
    }, [isSaveCartError]);

    return (
        <main className="cartPage">
            {!isCartLoading &&
                (bookInCart.length ? (
                    <>
                        <Modal
                            isOpen={modalIsOpen}
                            className="Modal"
                            overlayClassName="Overlay"
                        >
                            <p>請勾選商品再送出</p>
                            <button onClick={() => setModalIsOpen(false)}>
                                好
                            </button>
                        </Modal>
                        <table>
                            <thead>
                                <tr>
                                    <td>商品</td>
                                    <td>單價</td>
                                    <td>數量</td>
                                    <td>總計</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody>
                                {bookInCart.map((book) => (
                                    <CartBook
                                        book={book}
                                        setIsSaveCartError={setIsSaveCartError}
                                        key={book.bookId}
                                    />
                                ))}
                            </tbody>
                        </table>
                        <form
                            className="submitOrder"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <p>
                                {`總金額(${bookInCart.length}個商品)：`}
                                <span
                                    style={{ color: "rgb(230, 0 ,0)" }}
                                >{`$${bookInCart
                                    .filter((book) => book.active)
                                    .reduce((price, book) => {
                                        return (
                                            price + book.price * book.quantity
                                        );
                                    }, 0)}`}</span>
                            </p>
                            <button onClick={handleSubmit}>送出訂單</button>
                        </form>
                    </>
                ) : (
                    <p>您的購物車是空的～</p>
                ))}
            {isCartLoading && <p>Loading...</p>}
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="dark"
            />
        </main>
    );
};

export default CartPage;
