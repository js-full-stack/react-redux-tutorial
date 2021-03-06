import { useSelector } from "react-redux";
import { getAllTodos } from "../../../Redux/Todos/";
import "./Stats.scss";

const StatsRedux = () => {
  const allTodos = useSelector(getAllTodos);
  const completedTodoCount = allTodos.filter(({ completed }) => completed);

  return (
    <div className="Stats">
      <p className="Stats__item">
        <span className="Stats__value">{allTodos.length}</span>
        <span className="Stats__label">Всего:</span>
      </p>
      <p className="Stats__item">
        <span className="Stats__value">{completedTodoCount.length}</span>

        <span className="Stats__label">Выполнено: </span>
      </p>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   allTodos: getAllTodos(state),
// });

// export default connect(mapStateToProps, null)(StatsRedux);
export default StatsRedux;
