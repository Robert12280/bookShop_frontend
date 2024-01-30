import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./BookPage.scss";
import { useStoreActions, useStoreState } from "easy-peasy";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookPage = () => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const { bookId } = useParams();
    const getBookById = useStoreState((state) => state.getBookById);
    const book = getBookById(bookId);
    const bookInCart = useStoreState((state) => state.bookInCart);
    const setBookInCart = useStoreActions((actions) => actions.setBookInCart);

    const addBookInCart = (bookBuyInfo) => {
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
        ];

        setBookInCart(newBookInCart.sort((a, b) => a.bookId - b.bookId));
    };

    const handleAddCart = () => {
        const bookBuyInfo = {
            bookId: parseInt(bookId),
            bookname: book.bookname,
            quantity: quantity,
            price: book.price,
            totalPrice: book.price * quantity,
            checked: false,
            imgSrc: book.imgSrc,
        };

        const toastId = "addCartToastId";

        addBookInCart(bookBuyInfo);

        if (!toast.isActive(toastId)) {
            toast("已加入購物車", {
                toastId: toastId,
                autoClose: 2000,
            });
        } else {
            toast.update(toastId, {
                autoClose: 2000,
            });
        }
    };

    const handleBuy = () => {
        const bookBuyInfo = {
            bookId: parseInt(bookId),
            bookname: book.bookname,
            quantity: quantity,
            price: book.price,
            totalPrice: book.price * quantity,
            checked: true,
            imgSrc: book.imgSrc,
        };

        addBookInCart(bookBuyInfo);
        navigate("/cart");
    };

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
                                        setQuantity(
                                            parseInt(quantity) - 1 < 1
                                                ? 1
                                                : parseInt(quantity) - 1
                                        )
                                    }
                                >
                                    <RiSubtractFill />
                                </button>
                                <input
                                    type="quantity"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
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
