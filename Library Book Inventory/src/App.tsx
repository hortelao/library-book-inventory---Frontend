import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./components/Button";
import BooksList from "./components/BooksList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <BooksList></BooksList>
      </div>
    </>
  );
}

export default App;
