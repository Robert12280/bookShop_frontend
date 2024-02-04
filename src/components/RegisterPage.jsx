import { useEffect, useRef, useState } from "react";
import "./RegisterPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

const RegisterPage = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const token = useStoreState((state) => state.token);

    if (token) navigate("/");

    const isLoading = useStoreState((state) => state.isLoading);

    const isRegisterSuccess = useStoreState((state) => state.isRegisterSuccess);

    const setIsRegisterSuccess = useStoreActions(
        (actions) => actions.setIsRegisterSuccess
    );

    const registerPost = useStoreActions((actions) => actions.registerPost);

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);

    const [email, setEmail] = useState("");

    const registerErrMsg = useStoreState((state) => state.registerErrMsg);

    const setRegisterErrMsg = useStoreActions(
        (actions) => actions.setRegisterErrMsg
    );

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidUsername(username.length >= 8);
    }, [username]);

    useEffect(() => {
        setValidPassword(password.length >= 8);
        setValidMatch(password === matchPassword);
    }, [password, matchPassword]);

    useEffect(() => {
        setRegisterErrMsg("");
    }, [username, password, matchPassword, setRegisterErrMsg]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validUsername || !validPassword || !validMatch) {
            setRegisterErrMsg("Invalid Entry");
            return;
        }
        registerPost({ username, password, matchPassword, email });
    };

    if (isLoading) return <p style={{ marginTop: "10rem" }}>Loading...</p>;

    return (
        <main className="registerPage">
            {isRegisterSuccess ? (
                <section>
                    <h1>Success!</h1>
                    <Link
                        to="/login"
                        onClick={() => setIsRegisterSuccess(false)}
                    >
                        Sign In
                    </Link>
                </section>
            ) : (
                <form className="registerForm" onSubmit={handleSubmit}>
                    <label htmlFor="username">使用者名稱</label>
                    <input
                        ref={userRef}
                        type="text"
                        id="username"
                        placeholder="使用者名稱"
                        aria-invalid={validUsername ? "false" : "true"}
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {username && !validUsername && (
                        <p className="errorMsg">使用者名稱至少8位元</p>
                    )}
                    <label htmlFor="password">密碼</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="密碼"
                        aria-invalid={validPassword ? "false" : "true"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {password && !validPassword && (
                        <p className="errorMsg">密碼至少8位元</p>
                    )}
                    <label htmlFor="matchPassword">確認密碼</label>
                    <input
                        type="password"
                        id="matchPassword"
                        placeholder="再次輸入密碼"
                        aria-invalid={validMatch ? "false" : "true"}
                        required
                        value={matchPassword}
                        onChange={(e) => setMatchPassword(e.target.value)}
                    />
                    {matchPassword && !validMatch && (
                        <p className="errorMsg">與輸入密碼不一致</p>
                    )}
                    <label htmlFor="email">電子信箱</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="電子信箱"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {registerErrMsg && (
                        <p
                            style={{
                                color: "red",
                                fontSize: "0.5rem",
                            }}
                            ref={errRef}
                            aria-live="assertive"
                        >
                            {registerErrMsg}
                        </p>
                    )}
                    <input type="submit" id="submit" value="註冊" />
                    <p>
                        已經有帳號了嗎？請點擊<Link to="/login">登入</Link>
                    </p>
                </form>
            )}
        </main>
    );
};

export default RegisterPage;
