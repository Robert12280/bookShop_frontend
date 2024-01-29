import { createStore, action, thunk, computed } from "easy-peasy";
import api from "./api/books";

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
    getBookById: computed((state) => {
        return (bookId) =>
            state.books.find((book) => book.bookId.toString() === bookId);
    }),
    // signUpPost: thunk(async(actions, user, helpers) => {
    //     try{
    //         const response = await
    //     }catch(err){

    //     }
    // })
});
