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
    loginErrMsg: "",
    setLoginErrMsg: action((state, payload) => {
        state.loginErrMsg = payload;
    }),
    logoutErrMsg: "",
    setLogoutErrMsg: action((state, payload) => {
        state.logoutErrMsg = payload;
    }),
    registerErrMsg: "",
    setRegisterErrMsg: action((state, payload) => {
        state.registerErrMsg = payload;
    }),
    isLoading: false,
    setIsLoading: action((state, payload) => {
        state.isLoading = payload;
    }),
    isLogoutSuccess: false,
    setIsLogoutSuccess: action((state, payload) => {
        state.isLogoutSuccess = payload;
    }),
    isRegisterSuccess: false,
    setIsRegisterSuccess: action((state, payload) => {
        state.isRegisterSuccess = payload;
    }),
    getBookById: computed((state) => {
        return (bookId) =>
            state.books.find((book) => book.bookId.toString() === bookId);
    }),
    registerPost: thunk(async (actions, user, helpers) => {
        try {
            actions.setIsLoading(true);
            const response = await axios.post("/client/register", user);
            console.log(response);
            actions.setIsRegisterSuccess(true);
        } catch (err) {
            console.log(`Error: ${err.message}`);
            actions.setRegisterErrMsg(err.message);
        } finally {
            actions.setIsLoading(false);
        }
    }),
    loginPost: thunk(async (actions, user, helpers) => {
        try {
            const response = await axios.post("/client/login", user, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            actions.setToken(response?.data?.accessToken);
        } catch (err) {
            if (!err.response.status) {
                actions.setLoginErrMsg("No Server Response");
            } else if (err.response.status === 400) {
                actions.setLoginErrMsg("Missing Username of Password");
            } else if (err.response.status === 401) {
                actions.setLoginErrMsg("使用者名稱或密碼錯誤");
            }
        }
    }),
    logoutPost: thunk(async (actions) => {
        try {
            await axios.post("/client/logout", null, { withCredentials: true });
            actions.setIsLogoutSuccess(true);
            actions.setToken(null);
        } catch (err) {
            actions.setLogoutErrMsg(`Error: ${err.message}`);
            console.log(`Error: ${err.message}`);
        }
    }),
});
