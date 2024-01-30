import "./Book.scss";
import { Link } from "react-router-dom";

const Book = ({ book }) => {
    return (
        <Link className="book" to={`book/${book.bookId}`}>
            <article>
                <img src={book.imgSrc} alt="bookImg" />
                <h3>{book.bookname}</h3>
                <p>{`作者：${book.author}`}</p>
                <p>{`種類：${book.type}`}</p>
                <p>{`出版年份：${book.publishYear}`}</p>
                <p
                    style={{
                        color: "rgb(230, 0 ,0)",
                        fontWeight: "bold",
                        fontSize: "1rem",
                    }}
                >{`$${book.price}`}</p>
            </article>
        </Link>
    );
};

export default Book;
