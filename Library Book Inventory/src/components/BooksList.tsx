import axios from "axios";
import { useState, useEffect, MouseEvent } from "react";
import EditBook from "./EditBook";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedDate: string;
  price: number;
}

function BooksList() {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [editStatus, setEditStatus] = useState(false);
  const [editData, setEditData] = useState<Book | null>(null);

  async function fetchBooks() {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/books/`
      );

      const resultData = result.data;
      setBookList(resultData);
      console.log(resultData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  async function deleteBook(event: any) {
    const bookId: any = event.target.id;

    var answer = window.confirm("Do you want to delete this book?");
    if (answer) {
      try {
        const result = await axios.delete(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/books/` + bookId
        );

        const resultData = result.data;

        console.log(resultData);
      } catch (err) {
        console.error(err);
      }
      fetchBooks();
    }
  }

  function editBook(event: MouseEvent<HTMLButtonElement>) {
    const button = event.currentTarget;

    const id = Number(button.id);
    const title = button.getAttribute("data-title") || "";
    const author = button.getAttribute("data-author") || "";
    const isbn = button.getAttribute("data-isbn") || "";
    const publishedDate = button.getAttribute("data-published-date") || "";
    const price = parseFloat(button.getAttribute("data-price") || "0");

    setEditStatus(true);
    setEditData({
      id,
      title,
      author,
      isbn,
      publishedDate,
      price,
    });
  }

  async function saveBook(updatedBook: Book) {
    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/books/${updatedBook.id}`,
        updatedBook
      );
      fetchBooks();
      setEditStatus(false);
    } catch (err) {
      console.error(err);
    }
  }

  function hideForm() {
    setEditStatus(false);
  }

  return (
    <>
      <h1>List of all books</h1>
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
              <td>
                <button
                  id={book.id.toString()}
                  data-title={book.title}
                  data-author={book.author}
                  data-isbn={book.isbn}
                  data-published-date={book.publishedDate}
                  data-price={book.price.toString()}
                  onClick={editBook}
                >
                  Edit
                </button>
              </td>
              <td>
                <button id={book.id.toString()} onClick={deleteBook}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editStatus && editData && (
        <>
          <EditBook
            id={editData.id}
            title={editData.title}
            author={editData.author}
            isbn={editData.isbn}
            publishedDate={editData.publishedDate}
            price={editData.price}
            onSave={saveBook}
            onCancel={hideForm}
          />
        </>
      )}
    </>
  );
}

export default BooksList;
