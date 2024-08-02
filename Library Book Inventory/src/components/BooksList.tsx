import axios from "axios";
import { useState, useEffect, MouseEvent } from "react";
import EditBook from "./EditBook";
import NewBook from "./NewBook";

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
  const [newBookStatus, setNewBookStatus] = useState(false);
  const [editData, setEditData] = useState<Book | null>(null);
  const [listAll, setListAll] = useState(true);
  const [searchId, setSearchId] = useState();

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

  function handleIdChange(event: any) {
    const id = event.target.value;
    setSearchId(id);
  }

  async function findById() {
    setListAll(false);
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/books/` + searchId
      );

      const resultData = result.data;
      setBookList(resultData);
      console.log(resultData);
    } catch (err) {
      console.error(err);
    }
  }

  async function clearFilter() {
    await fetchBooks();
    setListAll(true);
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

  function formNewBook() {
    setNewBookStatus(true);
  }

  async function saveNewBook(updatedBook: Book) {
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/books/`,
        updatedBook
      );
      fetchBooks();
      setEditStatus(false);
    } catch (err) {
      console.error(err);
    }
    hideForm();
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
    setNewBookStatus(false);
  }

  return (
    <>
      <h1>{listAll ? "List of all books" : "Result by ID"}</h1>
      <span>Search by ID </span>
      <input type="number" onChange={handleIdChange} />
      <button onClick={findById}>Search</button>
      {!listAll && <button onClick={clearFilter}>Clear Filter</button>}
      <button className="newBook" onClick={formNewBook}>
        Add Book
      </button>
      {newBookStatus && (
        <>
          <NewBook onSave={saveNewBook} onCancel={hideForm} />
        </>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Published Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {listAll
            ? bookList.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
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
              ))
            : bookList && (
                <tr key={bookList.id}>
                  <td>{bookList.id}</td>
                  <td>{bookList.title}</td>
                  <td>{bookList.author}</td>
                  <td>{bookList.isbn}</td>
                  <td>
                    {new Date(bookList.publishedDate).toLocaleDateString()}
                  </td>
                  <td>${bookList.price}</td>
                  <td>
                    <button
                      id={bookList.id}
                      data-title={bookList.title}
                      data-author={bookList.author}
                      data-isbn={bookList.isbn}
                      data-published-date={bookList.publishedDate}
                      data-price={bookList.price}
                      onClick={editBook}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button id={bookList.id} onClick={deleteBook}>
                      Delete
                    </button>
                  </td>
                </tr>
              )}
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
