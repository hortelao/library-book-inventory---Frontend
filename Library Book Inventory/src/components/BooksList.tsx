import axios from "axios";
import { useState } from "react";

function BooksList() {
  const [bookList, setBookList] = useState([]);

  async function getAllBooks() {
    try {
      const result = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL + "/api/books/"
      );

      const resultData = result.data;
      setBookList(resultData);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <button onClick={getAllBooks}>Fetch all books</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Published Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
              <td>${book.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default BooksList;
