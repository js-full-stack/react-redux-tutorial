import { useState } from "react";
import "./TodoEditor.scss";

const TodoEditor = ({ onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const message = e.target.value;
    setMessage(message);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  return (
    <form className="TodoEditor" onSubmit={handleSubmit}>
      <textarea
        className="TodoEditor__textarea"
        value={message}
        onChange={handleChange}
      ></textarea>
      <button type="submit" className="TodoEditor__button">
        Сохранить
      </button>
    </form>
  );
};

export default TodoEditor;
