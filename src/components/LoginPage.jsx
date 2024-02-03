import { useState, useEffect, useRef } from "react";
import "./LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

const LoginPage = () => {
    const userRef = useRef();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        loginPost({ username, password });
        setIsLoading(false);
    };

    if (isLoading) return <p style={{ marginTop: "10rem" }}>Loading...</p>;

    return (
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
                <input type="submit" id="submit" value="登入" />
                <p>
                    還沒有帳號嗎？請點擊<Link to="/register">註冊</Link>
                </p>
            </form>
        </section>
    );
};

export default LoginPage;
