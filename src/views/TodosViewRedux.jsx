//  react/redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../Redux/Todos/todos-operations";
import { getLoading } from "../Redux/Todos/todos-selectors";

// components
import TodoFilterRedux from "../components/TodosRedux/TodoFilterRedux";
import TodoListRedux from "../components/TodosRedux/TodoListRedux";
import TodoEditorRedux from "../components/TodosRedux/TodoEditorRedux";
import StatsRedux from "../components/TodosRedux/StatsRedux";
import Modal from "../components/Modal";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodosViewRedux = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  // get todos on first mount
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <>
      {isLoading && <p>Загружаем...</p>}
      <StatsRedux />
      <button onClick={toggleModal}>Add todo</button>
      <TodoFilterRedux />
      <TodoListRedux />
      <ToastContainer />
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <TodoEditorRedux toggleModal={toggleModal} />
        </Modal>
      )}
    </>
  );
};

// const mapStateToProps = (state) => ({
//   isLoading: getLoading(state),
// });

// const mapDispatchToProps = (dispatch) => ({
//   fetchTodos: () => dispatch(fetchTodos()),
// });

export default TodosViewRedux;
