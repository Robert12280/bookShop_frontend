import { createStore, action, thunk, computed } from "easy-peasy";
import axios from "./api/axios";

export default createStore({
    books: [],
    setBooks: action((state, payload) => {
        state.books = payload;
    }),
    booksType: [],
    setBooksType: action((state, payload) => {
        state.booksType = payload;
    }),
    search: "",
    setSearch: action((state, payload) => {
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload;
    }),
    filterResults: [],
    setFilterResults: action((state, payload) => {
        state.filterResults = payload;
    }),
    filterMinYear: 2000,
    setFilterMinYear: action((state, payload) => {
        state.filterMinYear = payload;
    }),
    filterMaxYear: 2024,
    setFilterMaxYear: action((state, payload) => {
        state.filterMaxYear = payload;
    }),
    filterType: [],
    setFilterType: action((state, payload) => {
        state.filterType = payload;
    }),
    bookInCart: [],
    setBookInCart: action((state, payload) => {
        state.bookInCart = payload;
    }),
    token: null,
    setToken: action((state, payload) => {
        state.token = payload;
    }),
    loginErrMsg: null,
    setLoginErrMsg: action((state, payload) => {
        state.loginErrMsg = payload;
    }),
    logoutErrMsg: null,
    setLogoutErrMsg: action((state, payload) => {
        state.logoutErrMsg = payload;
    }),
    registerErrMsg: null,
    setRegisterErrMsg: action((state, payload) => {
        state.registerErrMsg = payload;
    }),
    isRegisterSuccess: false,
    setIsRegisterSuccess: action((state, payload) => {
        state.isRegisterSuccess = payload;
    }),
    isCartLoading: false,
    setIsCartLoading: action((state, payload) => {
        state.isCartLoading = payload;
    }),
    isLoading: false,
    setIsLoading: action((state, payload) => {
        state.isLoading = payload;
    }),
    isLogoutLoading: false,
    setIsLogoutLoading: action((state, payload) => {
        state.isLogoutLoading = payload;
    }),
    getCartErrMsg: null,
    setGetCartErrMsg: action((state, payload) => {
        state.getCartErrMsg = payload;
    }),
    isRefreshSuccess: false,
    setIsRefreshSuccess: action((state, payload) => {
        state.isRefreshSuccess = payload;
    }),
    getBookById: computed((state) => {
        return (bookId) =>
            state.books.find((book) => book.bookId.toString() === bookId);
    }),
    registerPost: thunk(async (actions, user, helpers) => {
        try {
            actions.setIsLoading(true);
            const response = await axios.post("/auth/register", user);
            if (response) {
                actions.setIsRegisterSuccess(true);
            }
        } catch (err) {
            if (!err.response.status) {
                actions.setRegisterErrMsg("No Server Response");
            } else if (err.response.status === 400) {
                actions.setRegisterErrMsg("請確認欄位格式皆正確");
            } else if (err.response.status === 409) {
                actions.setRegisterErrMsg("使用者名稱或電子信箱已被使用");
            }
        } finally {
            actions.setIsLoading(false);
        }
    }),
    loginPost: thunk(async (actions, user, helpers) => {
        try {
            actions.setIsLoading(true);
            const response = await axios.post("/auth/login", user, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            actions.setToken(response?.data?.accessToken);
        } catch (err) {
            if (!err.response.status) {
                actions.setLoginErrMsg("No Server Response");
            } else if (err.response.status === 400) {
                actions.setLoginErrMsg("請確認所有欄位都已填寫");
            } else if (err.response.status === 401) {
                actions.setLoginErrMsg("使用者名稱或密碼錯誤");
            }
        } finally {
            actions.setIsLoading(false);
        }
    }),
    logoutPost: thunk(async (actions) => {
        try {
            actions.setIsLogoutLoading(true);
            await axios.post("/auth/logout", null, { withCredentials: true });
            actions.setToken(null);
        } catch (err) {
            actions.setLogoutErrMsg(`Error: ${err.message}`);
            console.log(`Error: ${err.message}`);
        } finally {
            actions.setIsLogoutLoading(false);
        }
    }),
});
