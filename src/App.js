import { Switch, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";

// import TodosView from "./views/TodosView";
import AppBar from "./components/UserMenu/AppBar";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import TodosViewRedux from "./views/TodosViewRedux";
import CounterView from "./views/CounterView";
import { getCurrentUser } from "./Redux/authTodos/auth-operations";

function App({ onGetCurrentUser }) {
  useEffect(() => {
    onGetCurrentUser();
  }, []);
  return (
    <>
      <AppBar />
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/todos" component={TodosViewRedux} />
        <Route path="/login" component={LoginView} />
        <Route path="/register" component={RegisterView} />
      </Switch>
    </>
  );
}

const mapDispatchToProps = {
  onGetCurrentUser: getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);

//  <li>
//    <Link to="/counter">Counter</Link>
//  </li>;

// <Route path="/counter" component={CounterView} />
