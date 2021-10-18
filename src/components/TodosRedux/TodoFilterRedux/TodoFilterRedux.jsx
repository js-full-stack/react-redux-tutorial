import "./TodoFilter.scss";
import { useSelector, useDispatch } from "react-redux";
import { changeFilter, getFilterValue } from "../../../Redux/Todos/";

const TodoFilterRedux = () => {
  const dispatch = useDispatch();
  const onChangeFilter = (e) => dispatch(changeFilter(e.target.value));
  const value = useSelector(getFilterValue);
  return (
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
};

// const mapStateToProps = (state) => ({
//   value: getFilterValue(state),
// });

// const mapDispatchToProps = (dispatch) => ({
//   onChangeFilter: (e) => dispatch(changeFilter(e.target.value)),
// });

export default TodoFilterRedux;
