import { useState } from "react";
import "./TodoEditor.scss";
import { connect } from "react-redux";
import { addTodo } from "../../../Redux/Todos/todos-actions";
const TodoEditorRedux = ({ onSubmit }) => {
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

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (text) => dispatch(addTodo(text)),
});

// вместо mapStateToProps передаем null, т.к. здесь нужен только mapDispatchToProps
export default connect(null, mapDispatchToProps)(TodoEditorRedux);
