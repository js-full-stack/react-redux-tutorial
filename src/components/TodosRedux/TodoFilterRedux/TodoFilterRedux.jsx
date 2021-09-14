import "./TodoFilter.scss";
import { connect } from "react-redux";
import { changeFilter } from "../../../Redux/Todos/todos-actions";
import { getFilterValue } from "../../../Redux/Todos/todos-selectors";

const TodoFilterRedux = ({ value, onChangeFilter }) => (
  <div className="TodoFilter">
    <label className="TodoFilter__label">
      Поиск заметки по имени
      <input
        type="text"
        className="TodoFilter__input"
        onChange={onChangeFilter}
        value={value}
      ></input>
    </label>
  </div>
);

const mapStateToProps = (state) => ({
  value: getFilterValue(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeFilter: (e) => dispatch(changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoFilterRedux);
