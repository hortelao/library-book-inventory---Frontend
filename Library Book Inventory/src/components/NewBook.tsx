import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface EditBookProps {
  onSave: (book: any) => void;
  onCancel: () => void;
}

const NewBook: React.FC<EditBookProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [isbn, setIsbn] = useState();
  const [publishedDate, setPublishedDate] = useState();
  const [price, setPrice] = useState();

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
        <input type="text" name="title" onChange={handleInputChange} />
      </div>
      <div>
        <label>Author: </label>
        <input type="text" name="author" onChange={handleInputChange} />
      </div>
      <div>
        <label>ISBN: </label>
        <input type="text" name="isbn" onChange={handleInputChange} />
      </div>
      <div>
        <label>Published Date: </label>
        <input type="date" name="publishedDate" onChange={handleInputChange} />
      </div>
      <div>
        <label>Price: </label>
        <input
          type="number"
          step="0.01"
          name="price"
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

export default NewBook;
