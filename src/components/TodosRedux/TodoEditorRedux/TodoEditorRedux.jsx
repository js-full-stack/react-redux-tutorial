import { useState, useCallback } from "react";
import "./TodoEditor.scss";
import { useDispatch } from "react-redux";
import { addTodo } from "../../../Redux/Todos/";
const TodoEditorRedux = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const onSubmit = useCallback((text) => dispatch(addTodo(text)), [dispatch]);

  const handleChange = (e) => {
    const message = e.target.value;
    setMessage(message);
  };
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!message) return alert("Please enter your message");

      onSubmit(message);
      toggleModal();
      setMessage("");
      return;
    },
    [message, onSubmit, toggleModal]
  );

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

// const mapDispatchToProps = (dispatch) => ({
//   onSubmit: (text) => dispatch(addTodo(text)),
// });

export default TodoEditorRedux;
