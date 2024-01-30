import { createStore, action, thunk, computed } from "easy-peasy";
import usersApi from "./api/users";

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
    order: [],
    setOrder: action((state, payload) => {
        state.order = payload;
    }),
    token: "",
    setToken: action((state, payload) => {
        state.token = payload;
    }),
    errMsg: "",
    setErrMsg: action((state, payload) => {
        state.errMsg = payload;
    }),
    isLoading: false,
    setIsLoading: action((state, payload) => {
        state.isLoading = payload;
    }),
    isLogoutSuccess: false,
    setIsLogoutSuccess: action((state, payload) => {
        state.isLogoutSuccess = payload;
    }),
    getBookById: computed((state) => {
        return (bookId) =>
            state.books.find((book) => book.bookId.toString() === bookId);
    }),
    signInPost: thunk(async (actions, user, helpers) => {
        try {
            actions.setIsLoading(true);
            const response = await usersApi.post("/login", user);
            actions.setToken(response.data.accessToken);
        } catch (err) {
            if (!err.response.status) {
                actions.setErrMsg("No Server Response");
            } else if (err.response.status === 400) {
                actions.setErrMsg("Missing Username of Password");
            } else if (err.response.status === 401) {
                actions.setErrMsg("使用者名稱或密碼錯誤");
            }
        } finally {
            actions.setIsLoading(false);
        }
    }),
    logoutPost: thunk(async (actions) => {
        try {
            actions.setIsLoading(true);
            await usersApi.post("/logout");
            actions.setIsLogoutSuccess(true);
        } catch (err) {
            actions.setErrMsg(`Error: ${err.message}`);
            console.log(`Error: ${err.message}`);
        } finally {
            actions.setIsLoading(false);
        }
    }),
    refreshGet: thunk(async (actions, user, helpers) => {
        try {
            const response = await usersApi.get("/refresh");
            actions.setToken(response.data.accessToken);
            const { token } = helpers.getState();
            console.log(token);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
});
