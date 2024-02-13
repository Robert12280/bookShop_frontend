import { useState, useEffect, useRef } from "react";
import "./LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { FcGoogle } from "react-icons/fc";
import axios from "../api/axios";

const LoginPage = () => {
    const userRef = useRef();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const isLoading = useStoreState((state) => state.isLoading);
    const loginErrMsg = useStoreState((state) => state.loginErrMsg);
    const setLoginErrMsg = useStoreActions((actions) => actions.setLoginErrMsg);

    const token = useStoreState((state) => state.token);
    const loginPost = useStoreActions((actions) => actions.loginPost);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setLoginErrMsg("");
    }, [username, password]);

    useEffect(() => {
        if (token) navigate("/");
    }, [token]);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginPost({ username, password });
    };

    if (isLoading) return <p style={{ marginTop: "10rem" }}>Loading...</p>;

    return (
        <div className="loginPage">
            <section className="login">
                <form className="loginForm" onSubmit={handleSubmit}>
                    <label htmlFor="username">使用者名稱</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        placeholder="使用者名稱"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="password">密碼</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="密碼"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <p className="errMsg" aria-live="assertive">
                        {loginErrMsg}
                    </p>
                    <a
                        className="googleBtn"
                        href="https://bookshop-api-lb8f.onrender.com/auth/google"
                    >
                        <FcGoogle />
                    </a>

                    <input type="submit" id="submit" value="登入" />
                    <p>
                        還沒有帳號嗎？請點擊<Link to="/register">註冊</Link>
                    </p>
                </form>
            </section>
            <div className="testInfo">
                <h3>測試帳號密碼</h3>
                <p>帳號：12345678</p>
                <p>密碼：12345678</p>
            </div>
        </div>
    );
};

export default LoginPage;
