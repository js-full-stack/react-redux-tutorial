import "./Stats.scss";
import { connect } from "react-redux";

const StatsRedux = ({ allTodos }) => {
  const todoCompleted = allTodos.filter(({ completed }) => completed);

  return (
    <div className="Stats">
      <p className="Stats__item">
        <span className="Stats__value">{allTodos.length}</span>
        <span className="Stats__label">Всего:</span>
      </p>
      <p className="Stats__item">
        <span className="Stats__value">{todoCompleted.length}</span>

        <span className="Stats__label">Выполнено: </span>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allTodos: state.todos.items,
});

export default connect(mapStateToProps, null)(StatsRedux);
