import "./Home.scss";
import FilterList from "../components/FilterList";
import BookList from "../components/BookList";
import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const Home = ({ isBookLoading, bookFetchError, isCartLoading }) => {
    const filterResults = useStoreState((state) => state.filterResults);
    const searchResults = useStoreState((state) => state.searchResults);
    const filterType = useStoreState((state) => state.filterType);
    const filterMinYear = useStoreState((state) => state.filterMinYear);
    const filterMaxYear = useStoreState((state) => state.filterMaxYear);
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
            {(isBookLoading || isCartLoading) && <p>Loading books...</p>}
            {!isBookLoading && !isCartLoading && bookFetchError && (
                <p style={{ color: "red" }}>{bookFetchError}</p>
            )}
            {!isBookLoading && !isCartLoading && !bookFetchError && (
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