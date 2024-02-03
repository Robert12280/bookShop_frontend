import { useEffect, useState } from "react";
import Order from "./Order";
import "./OrderPage.scss";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [isOrderLoading, setIsOrderLoading] = useState(false);
    const [orderFetchErrorMsg, setOrderFetchErrorMsg] = useState(null);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const getOrderFromDatabase = () => {
            setIsOrderLoading(true);

            const controller = new AbortController();

            const getOrder = async () => {
                try {
                    const response = await axiosPrivate.get("/order", {
                        signal: controller.signal,
                    });
                    setOrders(
                        response.data.sort(
                            (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                        )
                    );
                } catch (err) {
                    console.log(`Error: ${err.message}`);
                    setOrderFetchErrorMsg(err.message);
                } finally {
                    setIsOrderLoading(false);
                }
            };

            getOrder();

            return () => {
                controller.abort();
            };
        };

        getOrderFromDatabase();
    }, []);

    return (
        <main className="orderPage">
            {!isOrderLoading &&
                !orderFetchErrorMsg &&
                (orders.length ? (
                    <ul className="allOrders">
                        {orders.map((order) => (
                            <Order key={order.orderId} order={order} />
                        ))}
                    </ul>
                ) : (
                    <p>您目前沒有訂單</p>
                ))}
            {!isOrderLoading && orderFetchErrorMsg && (
                <p
                    style={{
                        backgroundColor: "white",
                        color: "red",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    {orderFetchErrorMsg}
                </p>
            )}
            {isOrderLoading && (
                <p
                    style={{
                        backgroundColor: "white",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    Loading...
                </p>
            )}
        </main>
    );
};

export default OrderPage;
