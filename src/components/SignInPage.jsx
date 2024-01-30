import { useState, useEffect, useRef } from "react";
import "./SignInPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

const SignInPage = () => {
    const userRef = useRef();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const isLoading = useStoreState((state) => state.isLoading);
    const errMsg = useStoreState((state) => state.errMsg);
    const setErrMsg = useStoreActions((actions) => actions.setErrMsg);

    const token = useStoreState((state) => state.token);
    const signInPost = useStoreActions((actions) => actions.signInPost);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signInPost({ username, password });
        setUsername("");
        setPassword("");
        console.log(token);
        if (token) navigate("/");
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
                    {errMsg}
                </p>
                <input type="submit" id="submit" value="登入" />
                <p>
                    還沒有帳號嗎？請點擊<Link to="/signup">註冊</Link>
                </p>
            </form>
        </section>
    );
};

export default SignInPage;
