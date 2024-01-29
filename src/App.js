import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import CartPage from "./components/CartPage";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import { useEffect } from "react";
import BookPage from "./components/BookPage";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreState, useStoreActions } from "easy-peasy";
import Missing from "./components/Missing";

function App() {
    const setBooks = useStoreActions((actions) => actions.setBooks);
    const { data, fetchError, isLoading } = useAxiosFetch(
        "http://localhost:3500/books"
    );
    useEffect(() => {
        setBooks(data);
    }, [data, setBooks]);

    return (
        <div className="App">
            <Nav />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home isLoading={isLoading} fetchError={fetchError} />
                    }
                />
                <Route path="/cart" Component={CartPage} />
                <Route path="/login" Component={SignInPage} />
                <Route path="/signup" Component={SignUpPage} />
                <Route path="/book/:bookId" Component={BookPage}></Route>
                <Route path="*" Component={Missing}></Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
