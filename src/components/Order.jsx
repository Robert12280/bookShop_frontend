import "./Order.scss";
import { CiDeliveryTruck } from "react-icons/ci";

const Order = ({ order }) => {
    console.log(order);
    return (
        <li className="orderContainer">
            <div className="top">
                <span className="orderNum">
                    <p>訂單編號：{order.orderId}</p>
                </span>
                <span className="deliveryStatus">
                    <CiDeliveryTruck />
                    <p>{order.deliveryStatus}</p>
                </span>
                <p className="orderStatus">{order.orderStatus}</p>
            </div>
            <div className="mid">
                <ul>
                    {order.bookList.map((book) => (
                        <li>
                            <div className="imgContainer">
                                <img src={book.imgSrc} alt="prodImg" />
                            </div>
                            <div className="bookInfoContainer">
                                <h2>{book.bookname}</h2>
                                <p>{`x${book.quantity}`}</p>
                            </div>
                            <div className="singlePrice">
                                <p>{`$${book.price}`}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bottom">
                <p>
                    訂單金額：
                    <span
                        style={{ color: "rgb(230, 0 ,0)", fontWeight: "bold" }}
                    >{`$${order.bookList.reduce((price, book) => {
                        return price + book.price * book.quantity;
                    }, 0)}`}</span>
                </p>
            </div>
        </li>
    );
};

export default Order;
