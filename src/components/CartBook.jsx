import "./CartBook.scss";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { useStoreState, useStoreActions } from "easy-peasy";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";

const CartBook = ({ book, setIsSaveCartError }) => {
    const bookInCart = useStoreState((state) => state.bookInCart);
    const setBookInCart = useStoreActions((actions) => actions.setBookInCart);
    const axiosPrivate = useAxiosPrivate();
    const [isDisabled, setIsDisabled] = useState(false);
    const [timer, setTimer] = useState(null);
    const [bookList, setBookList] = useState([]);

    const updateCart = (bookList) => {
        setIsDisabled(true);
        const controller = new AbortController();

        const updateCartAxios = async () => {
            try {
                await axiosPrivate.patch("/cart", bookList, {
                    signal: controller.signal,
                });
            } catch (err) {
                setIsSaveCartError(true);
                console.log(`Error: ${err.message}`);
            } finally {
                setIsDisabled(false);
            }
        };

        updateCartAxios();

        return () => {
            controller.abort();
        };
    };

    const handleChangeQuantity = (bookId, quantity) => {
        const QUANTITY_REGEX = /^[1-9]\d*$/;
        if (!QUANTITY_REGEX.test(quantity)) quantity = book.quantity;
        const myBook = bookInCart.find((book) => book.bookId === bookId);
        myBook.quantity = quantity;

        const newBookInCart = [
            ...bookInCart.filter((book) => book.bookId !== bookId),
            myBook,
        ].sort((a, b) => a.bookId - b.bookId);

        setBookInCart(newBookInCart);
        setBookList(
            newBookInCart.map((item) => ({
                book: item.book,
                active: item.active,
                quantity: item.quantity,
            }))
        );
    };

    const handleDelete = (bookId) => {
        const newBookInCart = bookInCart.filter(
            (book) => book.bookId !== bookId
        );

        // save cart
        const bookList = newBookInCart.map((item) => ({
            book: item.book,
            active: item.active,
            quantity: item.quantity,
        }));

        updateCart(bookList);
        setBookInCart(newBookInCart);
    };

    const handleActive = (bookId) => {
        const myBook = bookInCart.find((book) => book.bookId === bookId);
        myBook.active = !myBook.active;

        const newBookInCart = [
            ...bookInCart.filter((book) => book.bookId !== bookId),
            myBook,
        ].sort((a, b) => a.bookId - b.bookId);

        // save cart
        const bookList = newBookInCart.map((item) => ({
            book: item.book,
            active: item.active,
            quantity: item.quantity,
        }));

        updateCart(bookList);
        setBookInCart(newBookInCart);
    };

    // 計時器（判斷是否連續點擊）
    useEffect(() => {
        let interval;
        if (timer !== null) {
            interval = setInterval(() => {
                const currentTime = Date.now();

                if (currentTime >= timer) {
                    updateCart(bookList);
                    setTimer(null);
                    clearInterval(interval);
                }
            }, 100);
        }

        return () => clearInterval(interval);
    }, [timer]);

    return (
        <>
            <tr key={book.bookId}>
                <td className="prod">
                    <label htmlFor="isProdActive"></label>
                    <input
                        type="checkbox"
                        id="isProdActive"
                        checked={book.active}
                        onChange={() => handleActive(book.bookId)}
                    />
                    <img src={book.imgSrc} alt="bookImg" />
                    <h2>{book.bookname}</h2>
                </td>
                <td>
                    <p style={{ color: "rgb(230, 0 ,0)" }}>
                        {`$${book.price}`}
                    </p>
                </td>
                <td className="quantity">
                    <button
                        disabled={isDisabled}
                        onClick={() => {
                            handleChangeQuantity(
                                book.bookId,
                                parseInt(book.quantity) - 1 < 1
                                    ? 1
                                    : parseInt(book.quantity) - 1
                            );
                            setTimer(Date.now() + 500);
                        }}
                    >
                        <RiSubtractFill />
                    </button>
                    <input
                        disabled={isDisabled}
                        type="quantity"
                        id="quantity"
                        min="1"
                        value={book.quantity}
                        onBlur={() => updateCart(bookList)}
                        onChange={(e) =>
                            handleChangeQuantity(
                                book.bookId,
                                parseInt(e.target.value)
                            )
                        }
                    />
                    <label htmlFor="quantity">amount</label>
                    <button
                        disabled={isDisabled}
                        onClick={() => {
                            handleChangeQuantity(
                                book.bookId,
                                parseInt(book.quantity + 1)
                            );
                            setTimer(Date.now() + 500);
                        }}
                    >
                        <RiAddFill />
                    </button>
                </td>
                <td>
                    <p style={{ color: "rgb(230, 0 ,0)" }}>{`$${
                        book.price * book.quantity
                    }`}</p>
                </td>
                <td>
                    <button
                        className="deleteBtn"
                        onClick={() => handleDelete(book.bookId)}
                    >
                        刪除
                    </button>
                </td>
            </tr>
        </>
    );
};

export default CartBook;
