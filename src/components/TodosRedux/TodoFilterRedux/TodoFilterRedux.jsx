import "./TodoFilter.scss";

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

export default TodoFilterRedux;
