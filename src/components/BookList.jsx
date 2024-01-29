import "./BookList.scss";
import Book from "./Book";
import { useStoreState } from "easy-peasy";

const BookList = () => {
    const books = useStoreState((state) => state.filterResults);
    return (
        <div className="bookList">
            {books.map((book) => (
                <Book key={book.bookId} book={book} />
            ))}
        </div>
    );
};

export default BookList;
