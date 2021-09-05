import { Switch, Route, Link } from "react-router-dom";

import TodosView from "./views/TodosView";
import TodosViewRedux from "./views/TodosViewRedux";

import CounterView from "./views/CounterView";
function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
        {/* <li>
          <Link to="/todos">TodoList</Link>
        </li> */}
        <li>
          <Link to="/todosRedux">TodoList:Redux</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/counter">
          <CounterView />
        </Route>

        {/* <Route path="/todos">
          <TodosView />
        </Route> */}
        <Route path="/todosRedux" component={TodosViewRedux} />
      </Switch>
    </>
    // <div className="App">
    //   <TodosView />
    //   <CounterView />
    // </div>
  );
}

export default App;
