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
    const getCartErrMsg = useStoreState((state) => state.getCartErrMsg);
    const setFilterResults = useStoreActions(
        (actions) => actions.setFilterResults
    );

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

    return (
        <main className="home">
            {(isBookLoading || isCartLoading) && <p>Loading</p>}
            {!isBookLoading &&
                !isCartLoading &&
                (bookFetchError || getCartErrMsg) && (
                    <div>
                        <p
                            style={{
                                color: "red",
                            }}
                        >
                            {bookFetchError}
                        </p>
                        <p
                            style={{
                                color: "red",
                            }}
                        >
                            {getCartErrMsg}
                        </p>
                    </div>
                )}
            {!isBookLoading &&
                !isCartLoading &&
                !bookFetchError &&
                !getCartErrMsg && (
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
