import "./FilterList.scss";
import { FaFilter } from "react-icons/fa";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect } from "react";

const FilterList = () => {
    const books = useStoreState((state) => state.books);
    const filterType = useStoreState((state) => state.filterType);
    const setFilterType = useStoreActions((actions) => actions.setFilterType);
    const filterMinYear = useStoreState((state) => state.filterMinYear);
    const setFilterMinYear = useStoreActions(
        (actions) => actions.setFilterMinYear
    );
    const filterMaxYear = useStoreState((state) => state.filterMaxYear);
    const setFilterMaxYear = useStoreActions(
        (actions) => actions.setFilterMaxYear
    );
    const booksType = useStoreState((state) => state.booksType);
    const setBooksType = useStoreActions((actions) => actions.setBooksType);

    useEffect(() => {
        let bookTypeSet = new Set();
        books.forEach((book) =>
            book.type.forEach((type) => bookTypeSet.add(type))
        );

        setBooksType([...bookTypeSet]);
    }, [books]);

    const handleFilter = (event) => {
        const value = event.target.value;

        if (event.target.checked) {
            setFilterType([...filterType, value]);
        } else {
            setFilterType(filterType.filter((type) => type !== value));
        }
    };
    return (
        <form className="filterBox" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
                <legend>
                    <FaFilter className="filterIcon" />
                    篩選條件
                </legend>
                <div className="filterType">
                    <input
                        type="checkbox"
                        id="all"
                        checked={!filterType.length}
                        onChange={() => setFilterType([])}
                    />
                    <label htmlFor="all">全部</label>
                </div>
                {booksType.map((type) => (
                    <div className="filterType">
                        <input
                            type="checkbox"
                            id={type}
                            value={type}
                            checked={filterType.includes(type)}
                            onChange={handleFilter}
                        />
                        <label htmlFor={type}>{type}</label>
                    </div>
                ))}

                <div className="filterDate">
                    <label htmlFor="publishYear">出版年份</label>
                    <div id="publishYear" className="number">
                        <input
                            type="number"
                            value={filterMinYear.toString()}
                            onChange={(e) =>
                                setFilterMinYear(parseInt(e.target.value))
                            }
                        />
                        <span>~</span>
                        <input
                            type="number"
                            value={filterMaxYear.toString()}
                            onChange={(e) =>
                                setFilterMaxYear(parseInt(e.target.value))
                            }
                        />
                    </div>
                </div>
            </fieldset>
        </form>
    );
};

export default FilterList;
