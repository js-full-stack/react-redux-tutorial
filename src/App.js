import { Switch, Route } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";

// import TodosView from "./views/TodosView";
import AppBar from "./components/UserMenu/AppBar";
// import HomeView from "./views/HomeView";
import CounterView from "./views/CounterView";
import { getCurrentUser } from "./Redux/authTodos/auth-operations";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const HomeView = lazy(() => import("./views/HomeView"));
const LoginView = lazy(() => import("./views/LoginView"));
const RegisterView = lazy(() => import("./views/RegisterView"));
const TodosViewRedux = lazy(() => import("./views/TodosViewRedux"));

function App({ onGetCurrentUser }) {
  useEffect(() => {
    onGetCurrentUser();
  }, []);

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <AppBar />
        <Switch>
          <Route exact path="/" component={HomeView} />
          <PublicRoute path="/login" restricted component={LoginView} />
          <PublicRoute path="/register" restricted component={RegisterView} />
          <PrivateRoute path="/todos" component={TodosViewRedux} />
        </Switch>
      </Suspense>
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
