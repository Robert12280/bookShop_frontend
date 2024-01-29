import "./Nav.scss";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const Nav = () => {
    const books = useStoreState((state) => state.books);
    const search = useStoreState((state) => state.search);
    const bookInCart = useStoreState((state) => state.bookInCart);
    const setSearch = useStoreActions((actions) => actions.setSearch);
    const setSearchResults = useStoreActions(
        (actions) => actions.setSearchResults
    );
    const location = useLocation();

    useEffect(() => {
        const filteredResult = books;

        setSearchResults(filteredResult.reverse());
    }, [books, search, setSearchResults]);

    const isLoginPage = location.pathname === "/login";
    const isSignUpPage = location.pathname === "/signup";

    return (
        <nav className="nav">
            <div className="navContainer">
                <Link className="homeBtn" to={"/"}>
                    BookShop
                </Link>
                {!isLoginPage && !isSignUpPage && (
                    <form
                        className="navForm"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label htmlFor="search">Search</label>
                        <input
                            type="text"
                            id="search"
                            role="searchbox"
                            placeholder="Search Books"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Link className="cartBtn" to={"/cart"}>
                            <FaShoppingCart />
                        </Link>
                        {bookInCart.length && (
                            <span className="prodAmount">
                                <p>{bookInCart.length}</p>
                            </span>
                        )}
                        <Link className="signInBtn" to={"/login"}>
                            Sign in
                        </Link>
                    </form>
                )}
                {isLoginPage && !isSignUpPage && <h2>登入</h2>}
                {!isLoginPage && isSignUpPage && <h2>註冊</h2>}
            </div>
        </nav>
    );
};

export default Nav;
