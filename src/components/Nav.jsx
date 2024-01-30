import "./Nav.scss";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const Nav = () => {
    const books = useStoreState((state) => state.books);
    const search = useStoreState((state) => state.search);
    const bookInCart = useStoreState((state) => state.bookInCart);
    const setSearch = useStoreActions((actions) => actions.setSearch);
    const setSearchResults = useStoreActions(
        (actions) => actions.setSearchResults
    );
    const logoutPost = useStoreActions((actions) => actions.logoutPost);

    const isLogoutSuccess = useStoreState((state) => state.isLogoutSuccess);
    const errMsg = useStoreState((state) => state.errMsg);

    const setErrMsg = useStoreActions((actions) => actions.setErrMsg);

    const isLoading = useStoreState((state) => state.isLoading);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isLoginPage = pathname === "/login";
    const isSignUpPage = pathname === "/signup";
    const isCartPage = /^\/cart(\/)?$/.test(pathname);
    const isBookPage = /^\/book\/\d+(\/)?$/.test(pathname);

    const [userBtnIsActive, setUserBtnIsActive] = useState(false);

    useEffect(() => {
        const filteredResult = books;

        setSearchResults(filteredResult.reverse());
    }, [books, search, setSearchResults]);

    useEffect(() => {
        if (isLogoutSuccess) navigate("/");
    }, [isLogoutSuccess, navigate]);

    if (isLoading) return <p style={{ marginTop: "10rem" }}>Logging Out...</p>;

    if (errMsg) {
        const err = errMsg;
        setErrMsg("");
        return <p style={{ marginTop: "10rem" }}>{err}</p>;
    }

    return (
        <nav className="nav">
            <div className="navContainer">
                <div className="header">
                    <Link className="homeBtn" to={"/"}>
                        BookShop
                    </Link>
                    {isCartPage && <h2>購物車</h2>}
                    {isLoginPage && <h2>登入</h2>}
                    {isSignUpPage && <h2>註冊</h2>}
                </div>

                {!isLoginPage && !isSignUpPage && !isCartPage && (
                    <form
                        className="navForm"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {!isBookPage && (
                            <>
                                <label htmlFor="search">Search</label>
                                <input
                                    type="text"
                                    id="search"
                                    role="searchbox"
                                    placeholder="Search Books"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </>
                        )}

                        <Link className="cartBtn" to={"/cart"}>
                            <FaShoppingCart />
                        </Link>
                        {bookInCart.length && (
                            <span className="prodAmount">
                                <p>{bookInCart.length}</p>
                            </span>
                        )}
                        {/* <Link className="signInBtn" to={"/login"}>
                            Sign in
                        </Link> */}
                    </form>
                )}
                <div className="user">
                    <button
                        className="userBtn"
                        onMouseEnter={() => setUserBtnIsActive(true)}
                        onMouseLeave={() => setUserBtnIsActive(false)}
                    >
                        <FaUser />
                    </button>
                    {userBtnIsActive && (
                        <div
                            className="userOptions"
                            onMouseEnter={() => setUserBtnIsActive(true)}
                            onMouseLeave={() => setUserBtnIsActive(false)}
                        >
                            <ul>
                                <li>
                                    <Link to="/orders">查看訂單</Link>
                                </li>
                                <li className="logoutBtn">
                                    <button>登出</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
