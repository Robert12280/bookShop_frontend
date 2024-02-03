import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import CartPage from "./components/CartPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { useEffect, useState } from "react";
import BookPage from "./components/BookPage";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";
import Missing from "./components/Missing";
import Layout from "./components/Layout";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import OrderPage from "./components/OrderPage";

function App() {
    const [isCartLoading, setIsCartLoading] = useState(false);
    const setBookInCart = useStoreActions((actions) => actions.setBookInCart);
    const setBooks = useStoreActions((actions) => actions.setBooks);
    const { bookData, bookFetchError, isBookLoading } = useAxiosFetch(
        "http://localhost:3500/books"
    );
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        setBooks(bookData);
    }, [bookData, setBooks]);

    // Get cart
    useEffect(() => {
        setIsCartLoading(true);
        const getCartFromDatabase = () => {
            const controller = new AbortController();

            const getCart = async () => {
                try {
                    const response = await axiosPrivate.get("/cart", {
                        signal: controller.signal,
                    });
                    setBookInCart(response.data);
                } catch (err) {
                    console.log(`Error: ${err.message}`);
                } finally {
                    setIsCartLoading(false);
                }
            };

            getCart();

            return () => {
                controller.abort();
            };
        };

        getCartFromDatabase();
    }, [axiosPrivate]);

    return (
        <div className="App">
            <Nav />
            <Routes>
                <Route path="/" Component={Layout}>
                    {/* Publice */}
                    <Route path="login" Component={LoginPage} />
                    <Route path="register" Component={RegisterPage} />
                    <Route
                        path="/"
                        element={
                            <Home
                                isBookLoading={isBookLoading}
                                bookFetchError={bookFetchError}
                                isCartLoading={isCartLoading}
                            />
                        }
                    />

                    {/* Private */}
                    <Route Component={PersistLogin}>
                        <Route Component={RequireAuth}>
                            <Route path="cart" Component={CartPage} />
                        </Route>
                        <Route Component={RequireAuth}>
                            <Route
                                path="book/:bookId"
                                Component={BookPage}
                            ></Route>
                            <Route path="orders" Component={OrderPage}></Route>
                        </Route>
                    </Route>

                    <Route path="*" Component={Missing} />
                </Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
