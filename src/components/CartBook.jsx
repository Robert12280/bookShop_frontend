import "./CartBook.scss";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { useStoreState, useStoreActions } from "easy-peasy";

const CartBook = ({ book }) => {
    const bookInCart = useStoreState((state) => state.bookInCart);
    const setBookInCart = useStoreActions((actions) => actions.setBookInCart);

    const handleChangeQuantity = (bookId, quantuty) => {
        const myBook = bookInCart.find((book) => book.bookId === bookId);
        myBook.quantity = quantuty;
        myBook.totalPrice = myBook.quantity * myBook.price;

        const newBookInCart = [
            ...bookInCart.filter((book) => book.bookId !== bookId),
            myBook,
        ];

        setBookInCart(newBookInCart.sort((a, b) => a.bookId - b.bookId));
    };

    const handleDelete = (bookId) => {
        setBookInCart(bookInCart.filter((book) => book.bookId !== bookId));
    };

    const handleChecked = (bookId) => {
        const myBook = bookInCart.find((book) => book.bookId === bookId);
        myBook.checked = !myBook.checked;

        const newBookInCart = [
            ...bookInCart.filter((book) => book.bookId !== bookId),
            myBook,
        ];

        setBookInCart(newBookInCart.sort((a, b) => a.bookId - b.bookId));
    };

    return (
        <>
            <tr key={book.bookId}>
                <td>
                    <div className="prod">
                        <label htmlFor="isProdChecked"></label>
                        <input
                            type="checkbox"
                            id="isProdChecked"
                            checked={book.checked}
                            onChange={() => handleChecked(book.bookId)}
                        />
                        <img src={book.imgSrc} alt="bookImg" />
                        <h2>{book.bookname}</h2>
                    </div>
                </td>
                <td>
                    <p style={{ color: "rgb(230, 0 ,0)" }}>
                        {`$${book.price}`}
                    </p>
                </td>
                <td>
                    <div className="quantity">
                        <button
                            onClick={() =>
                                handleChangeQuantity(
                                    book.bookId,
                                    parseInt(book.quantity) - 1 < 1
                                        ? 1
                                        : parseInt(book.quantity) - 1
                                )
                            }
                        >
                            <RiSubtractFill />
                        </button>
                        <input
                            type="quantity"
                            id="quantity"
                            min="1"
                            value={book.quantity > 0 ? book.quantity : ""}
                            onChange={(e) =>
                                handleChangeQuantity(
                                    book.bookId,
                                    e.target.value
                                )
                            }
                        />
                        <label htmlFor="quantity">amount</label>
                        <button
                            onClick={() =>
                                handleChangeQuantity(
                                    book.bookId,
                                    parseInt(book.quantity + 1)
                                )
                            }
                        >
                            <RiAddFill />
                        </button>
                    </div>
                </td>
                <td>
                    <p
                        style={{ color: "rgb(230, 0 ,0)" }}
                    >{`$${book.totalPrice}`}</p>
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
