import { useState } from "react";
import "./TodoEditor.scss";
import { connect } from "react-redux";
import { addTodo } from "../../../Redux/Todos/";
const TodoEditorRedux = ({ onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const message = e.target.value;
    setMessage(message);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      onSubmit(message);
      setMessage("");
      return;
    }
    alert("Please enter your message");
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

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (text) => dispatch(addTodo(text)),
});

export default connect(null, mapDispatchToProps)(TodoEditorRedux);
