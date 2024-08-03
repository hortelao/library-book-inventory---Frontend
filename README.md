# Library Book Inventory Management Frontend

This project is the frontend for managing a library's book inventory. It allows users to add, view, update, and delete books from the inventory. The frontend is developed using React, and it communicates with a backend REST API to perform CRUD operations.

## Features

- **View**: Display a list of all books.
- **Add**: Add a new book to the inventory.
- **Update**: Update details of an existing book.
- **Delete**: Delete a book from the inventory.

## Requirements

- Node.js and npm

## Getting Started

1. **Clone the Repository**

   ```sh
   git clone https://github.com/hortelao/library-book-inventory---Frontend
   cd library-book-inventory---Frontend/frontend

   ```

2. **Install Dependencies**

sh
npm install

3. **Configure Environment Variables**

Create a .env file in the frontend directory and add the following line:

env
VITE_REACT_APP_API_URL=http://localhost:8080
This should point to the URL where your backend API is running.

Run the Frontend

sh
npm run dev
The frontend will be accessible at http://localhost:5173.

## API Endpoints

The frontend communicates with the following backend API endpoints:

GET /api/books - Retrieve a list of all books.
GET /api/books/{id} - Retrieve details of a specific book by ID.
POST /api/books - Add a new book.
PUT /api/books/{id} - Update an existing book by ID.
DELETE /api/books/{id} - Delete a book by ID.

Contact
For any issues or questions, please contact [andrefhortelao@gmail.com].
