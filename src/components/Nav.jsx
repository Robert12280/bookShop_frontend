import "./Nav.scss";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { jwtDecode } from "jwt-decode";

const Nav = () => {
    const books = useStoreState((state) => state.books);
    const search = useStoreState((state) => state.search);
    const bookInCart = useStoreState((state) => state.bookInCart);
    const setSearch = useStoreActions((actions) => actions.setSearch);
    const setSearchResults = useStoreActions(
        (actions) => actions.setSearchResults
    );
    const logoutPost = useStoreActions((actions) => actions.logoutPost);

    const token = useStoreState((state) => state.token);

    const isLogoutSuccess = useStoreState((state) => state.isLogoutSuccess);
    const setIsLogoutSuccess = useStoreActions(
        (actions) => actions.setIsLogoutSuccess
    );
    const logoutErrMsg = useStoreState((state) => state.logoutErrMsg);

    const setLogoutErrMsg = useStoreActions(
        (actions) => actions.setLogoutErrMsg
    );

    const [isLoading, setIsLoading] = useState(false);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isLoginPage = pathname === "/login";
    const isRegisterPage = pathname === "/register";
    const isCartPage = /^\/cart(\/)?$/.test(pathname);
    const isBookPage = /^\/book\/\d+(\/)?$/.test(pathname);

    const [userBtnIsActive, setUserBtnIsActive] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const filteredResult = books.filter((book) =>
            book.bookname.toLowerCase().includes(search.toLowerCase())
        );

        setSearchResults(filteredResult.reverse());
    }, [books, search, setSearchResults]);

    useEffect(() => {
        if (isLogoutSuccess) {
            navigate("/");
            setIsLogoutSuccess(false);
        }
    }, [setIsLogoutSuccess, isLogoutSuccess, navigate]);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.UserInfo.username);
        }
    }, [token]);

    if (isLoading) return <p style={{ marginTop: "10rem" }}>Logging Out...</p>;

    if (logoutErrMsg) {
        const err = logoutErrMsg;
        setLogoutErrMsg("");
        return <p style={{ marginTop: "10rem" }}>{err}</p>;
    }

    const handleLogout = async () => {
        setIsLoading(true);
        logoutPost();
        setIsLoading(false);
        window.location.reload();
    };

    return (
        <nav className="nav">
            <div className="navContainer">
                <div className="header">
                    <Link className="homeBtn" to={"/"}>
                        BookShop
                    </Link>
                    {isCartPage && <h2>購物車</h2>}
                    {isLoginPage && <h2>登入</h2>}
                    {isRegisterPage && <h2>註冊</h2>}
                </div>

                {!isLoginPage && !isRegisterPage && !isCartPage && (
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
                        {token && (
                            <div className="cartBtn">
                                <Link to={"/cart"}>
                                    <FaShoppingCart />
                                </Link>
                                {bookInCart.length && (
                                    <span className="prodAmount">
                                        <p>{bookInCart.length}</p>
                                    </span>
                                )}
                            </div>
                        )}

                        {!token && (
                            <Link className="signInBtn" to={"/login"}>
                                Sign in
                            </Link>
                        )}
                    </form>
                )}
                {token && (
                    <>
                        <div
                            className="userContainer"
                            onMouseEnter={() => setUserBtnIsActive(true)}
                            onMouseLeave={() => setUserBtnIsActive(false)}
                        >
                            <div className="user">
                                <button className="userBtn">
                                    <FaUser />
                                </button>
                                <p className="username">{username}</p>
                            </div>

                            {userBtnIsActive && (
                                <div className="userOptions">
                                    <ul>
                                        <li>
                                            <Link to="/orders">查看訂單</Link>
                                        </li>
                                        <li className="logoutBtn">
                                            <button onClick={handleLogout}>
                                                登出
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
