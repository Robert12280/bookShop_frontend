import "./CartPage.scss";
import CartBook from "./CartBook";
import { useStoreState } from "easy-peasy";

const CartPage = () => {
    const bookInCart = useStoreState((state) => state.bookInCart);
    // const setOrder = useStoreActions((actions) => actions.setOrder);

    const handleSubmit = () => {
        // const order = bookInCart.filter((book) => book.checked);
        // if (order) {
        // } else {
        // }
    };

    return (
        <main className="cartPage">
            {bookInCart.length ? (
                <>
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
                                <CartBook book={book} key={book.bookId} />
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
                                    return price + book.totalPrice;
                                }, 0)}`}</span>
                        </p>
                        <button onClick={handleSubmit}>送出訂單</button>
                    </form>
                </>
            ) : (
                <p>您的購物車是空的～</p>
            )}
        </main>
    );
};

export default CartPage;
