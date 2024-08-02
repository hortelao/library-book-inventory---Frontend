import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface EditBookProps {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedDate: string;
  price: number;
  onSave: (book: any) => void;
  onCancel: () => void;
}

const EditBook: React.FC<EditBookProps> = ({
  id,
  title: initialTitle,
  author: initialAuthor,
  isbn: initialIsbn,
  publishedDate: initialPublishedDate,
  price: initialPrice,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [author, setAuthor] = useState(initialAuthor);
  const [isbn, setIsbn] = useState(initialIsbn);
  const [publishedDate, setPublishedDate] = useState(initialPublishedDate);
  const [price, setPrice] = useState(initialPrice);

  useEffect(() => {
    setTitle(initialTitle);
    setAuthor(initialAuthor);
    setIsbn(initialIsbn);
    setPublishedDate(initialPublishedDate);
    setPrice(initialPrice);
  }, [
    initialTitle,
    initialAuthor,
    initialIsbn,
    initialPublishedDate,
    initialPrice,
  ]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "isbn":
        setIsbn(value);
        break;
      case "publishedDate":
        setPublishedDate(value);
        break;
      case "price":
        setPrice(Number(value));
        break;
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSave({
      id,
      title,
      author,
      isbn,
      publishedDate,
      price,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title: </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Author: </label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>ISBN: </label>
        <input
          type="text"
          name="isbn"
          value={isbn}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Published Date: </label>
        <input
          type="date"
          name="publishedDate"
          value={publishedDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Price: </label>
        <input
          type="number"
          step="0.01"
          name="price"
          value={price}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditBook;
