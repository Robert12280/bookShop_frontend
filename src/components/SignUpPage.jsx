import "./SignUpPage.scss";
import { Link } from "react-router-dom";

const SignUpPage = () => {
    return (
        <form className="signUpForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="username">使用者名稱</label>
            <input
                type="text"
                id="username"
                placeholder="使用者名稱"
                required
            />
            <label htmlFor="password">密碼</label>
            <input type="password" id="password" placeholder="密碼" required />
            <label htmlFor="againPassword">確認密碼</label>
            <input
                type="password"
                id="againPassword"
                placeholder="再次輸入密碼"
                required
            />
            <label htmlFor="email">電子信箱</label>
            <input type="email" id="email" placeholder="電子信箱" required />
            <input type="submit" id="submit" value="註冊" />
            <p>
                已經有帳號了嗎？請點擊<Link to="/login">登入</Link>
            </p>
        </form>
    );
};

export default SignUpPage;
