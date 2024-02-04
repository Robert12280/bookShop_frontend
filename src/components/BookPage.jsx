import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./BookPage.scss";
import { useStoreActions, useStoreState } from "easy-peasy";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const BookPage = () => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const { bookId } = useParams();
    const getBookById = useStoreState((state) => state.getBookById);
    const book = getBookById(bookId);
    const bookInCart = useStoreState((state) => state.bookInCart);
    const setBookInCart = useStoreActions((actions) => actions.setBookInCart);
    const axiosPrivate = useAxiosPrivate();

    const addBookInCart = (bookBuyInfo, isBuy) => {
        // check book has already in cart
        bookBuyInfo.bookId = parseInt(bookBuyInfo.bookId);
        const isBookExist = bookInCart.find(
            (book) => book.bookId === bookBuyInfo.bookId
        );

        if (isBookExist) {
            bookBuyInfo.quantity = isBookExist.quantity + bookBuyInfo.quantity;
            bookBuyInfo.totalPrice =
                isBookExist.totalPrice + bookBuyInfo.totalPrice;
        }

        const newBookInCart = [
            ...bookInCart.filter((book) => book.bookId !== bookBuyInfo.bookId),
            bookBuyInfo,
        ].sort((a, b) => a.bookId - b.bookId);

        // save cart
        const bookList = newBookInCart.map((item) => ({
            book: item.book,
            active: item.active,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
        }));

        const updateCart = () => {
            console.log(isBuy);
            const controller = new AbortController();

            const updateCartAxios = async () => {
                try {
                    await axiosPrivate.patch("/cart", bookList, {
                        signal: controller.signal,
                    });

                    setBookInCart(newBookInCart);

                    const toastId = "addCartToastSuccessId";
                    if (!toast.isActive(toastId)) {
                        toast.success("已加入購物車", {
                            toastId: toastId,
                            autoClose: 1000,
                        });
                    } else {
                        toast.update(toastId, {
                            autoClose: 1000,
                        });
                    }

                    if (isBuy) navigate("/cart");
                } catch (err) {
                    console.log(`Error: ${err.message}`);
                    const toastId = "addCartToastErrorId";
                    if (!toast.isActive(toastId)) {
                        toast.error("加入購物車失敗", {
                            toastId: toastId,
                            autoClose: 1000,
                        });
                    } else {
                        toast.update(toastId, {
                            autoClose: 1000,
                        });
                    }
                }
            };

            updateCartAxios();

            return () => {
                controller.abort();
            };
        };

        updateCart();
    };

    const handleAddCart = () => {
        const bookBuyInfo = {
            book: book._id,
            bookId: parseInt(bookId),
            bookname: book.bookname,
            quantity: quantity,
            price: book.price,
            totalPrice: book.price * quantity,
            active: false,
            imgSrc: book.imgSrc,
        };

        addBookInCart(bookBuyInfo, false);
    };

    const handleBuy = () => {
        const bookBuyInfo = {
            book: book._id,
            bookId: parseInt(bookId),
            bookname: book.bookname,
            quantity: quantity,
            price: book.price,
            totalPrice: book.price * quantity,
            active: true,
            imgSrc: book.imgSrc,
        };

        addBookInCart(bookBuyInfo, true);
    };

    useEffect(() => {
        const QUANTITY_REGEX = /^[1-9]\d*$/;
        if (!QUANTITY_REGEX.test(parseInt(quantity))) setQuantity(1);
    }, [quantity]);

    return (
        <main className="bookPage">
            {book && (
                <>
                    <div className="buyInfo">
                        <div className="imgContainer">
                            <img src={book.imgSrc} alt="bookImg" />
                        </div>

                        <form
                            className="bookInfo"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <h3>{`${book.bookname}`}</h3>
                            <p>{`作者：${book.author}`}</p>
                            <p>{`出版年份：${book.publishYear}`}</p>
                            <p
                                style={{ color: "rgb(230, 0 ,0)" }}
                            >{`$${book.price}`}</p>
                            <label htmlFor="quantity">quantity</label>
                            <div className="quantity">
                                <button
                                    onClick={() =>
                                        setQuantity(parseInt(quantity) - 1)
                                    }
                                >
                                    <RiSubtractFill />
                                </button>
                                <input
                                    type="quantity"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(parseInt(e.target.value))
                                    }
                                />
                                <label htmlFor="quantity">amount</label>
                                <button
                                    onClick={() =>
                                        setQuantity(parseInt(quantity) + 1)
                                    }
                                >
                                    <RiAddFill />
                                </button>
                            </div>
                            <div className="submitBtn">
                                <button id="addCart" onClick={handleAddCart}>
                                    <FaCartPlus /> 加入購物車
                                </button>
                                <button id="buy" onClick={handleBuy}>
                                    直接購買
                                </button>
                            </div>
                        </form>
                    </div>
                    <p>
                        內容摘要：
                        <br />
                        <br />
                        {`${book.summary}`}
                    </p>
                </>
            )}
            {!book && (
                <div className="bookNotFound">
                    <h2>Book Not Found</h2>
                    <p>Well, that's disappointing</p>
                    <p>
                        <Link to="/">Visit our homepage</Link>
                    </p>
                </div>
            )}
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

export default BookPage;
