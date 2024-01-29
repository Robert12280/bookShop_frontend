import "./SignInPage.scss";
import { Link } from "react-router-dom";

const SignInPage = () => {
    return (
        <form className="loginForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="username">使用者名稱</label>
            <input
                type="text"
                id="username"
                placeholder="使用者名稱"
                required
            />
            <label htmlFor="password">密碼</label>
            <input type="password" id="password" placeholder="密碼" required />
            <input type="submit" id="submit" value="登入" />
            <p>
                還沒有帳號嗎？請點擊<Link to="/signup">註冊</Link>
            </p>
        </form>
    );
};

export default SignInPage;
