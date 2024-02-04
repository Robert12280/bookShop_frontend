import "./Home.scss";
import FilterList from "../components/FilterList";
import BookList from "../components/BookList";
import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const Home = ({ isBookLoading, bookFetchError }) => {
    const filterResults = useStoreState((state) => state.filterResults);
    const searchResults = useStoreState((state) => state.searchResults);
    const filterType = useStoreState((state) => state.filterType);
    const filterMinYear = useStoreState((state) => state.filterMinYear);
    const filterMaxYear = useStoreState((state) => state.filterMaxYear);
    const isCartLoading = useStoreState((state) => state.isCartLoading);
    const setFilterResults = useStoreActions(
        (actions) => actions.setFilterResults
    );
    const logoutErrMsg = useStoreState((state) => state.logoutErrMsg);

    const setLogoutErrMsg = useStoreActions(
        (actions) => actions.setLogoutErrMsg
    );
    const isLogoutLoading = useStoreState((state) => state.isLogoutLoading);

    useEffect(() => {
        // Filter books type
        let filterList = filterType.length
            ? searchResults.filter((book) =>
                  filterType.includes(book.type.toString())
              )
            : searchResults;

        // Filter books year

        filterList = filterList.filter(
            (book) =>
                book.publishYear >= filterMinYear &&
                book.publishYear <= filterMaxYear
        );

        setFilterResults(filterList);
    }, [
        searchResults,
        filterType,
        filterMinYear,
        filterMaxYear,
        setFilterResults,
    ]);

    if (isLogoutLoading)
        return <p style={{ marginTop: "10rem" }}>logging out...</p>;

    if (logoutErrMsg) {
        const err = logoutErrMsg;
        setLogoutErrMsg("");
        return <p style={{ marginTop: "10rem" }}>{err}</p>;
    }

    if (isBookLoading || isCartLoading) return <p>Loading...</p>;

    return (
        <main className="home">
            {bookFetchError && (
                <p
                    style={{
                        color: "red",
                    }}
                >
                    {bookFetchError}
                </p>
            )}
            {!bookFetchError && (
                <>
                    <FilterList />
                    {filterResults.length ? (
                        <BookList />
                    ) : (
                        <div className="noDisplay">
                            <p>No books to display.</p>
                        </div>
                    )}
                </>
            )}
        </main>
    );
};

export default Home;
