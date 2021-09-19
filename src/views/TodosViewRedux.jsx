import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchTodos } from "../Redux/Todos/todos-operations";
import { getLoading } from "../Redux/Todos/todos-selectors";

import TodoFilterRedux from "../components/TodosRedux/TodoFilterRedux";
import TodoListRedux from "../components/TodosRedux/TodoListRedux";
import TodoEditorRedux from "../components/TodosRedux/TodoEditorRedux";
import StatsRedux from "../components/TodosRedux/StatsRedux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodosViewRedux = ({ isLoading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <>
      {isLoading && <p>Загружаем...</p>}
      <StatsRedux />
      <TodoEditorRedux />
      <TodoFilterRedux />
      <TodoListRedux />
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: getLoading(state),
});

// const mapDispatchToProps = (dispatch) => ({
//   fetchTodos: () => dispatch(fetchTodos()),
// });

export default connect(mapStateToProps, null)(TodosViewRedux);
