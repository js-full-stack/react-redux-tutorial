import { Switch, Route } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";

import AppBar from "./components/UserMenu/AppBar";

import CounterView from "./views/CounterView";
import { getCurrentUser } from "./Redux/authTodos/auth-operations";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const HomeView = lazy(() => import("./views/HomeView"));
const LoginView = lazy(() => import("./views/LoginView"));
const RegisterView = lazy(() => import("./views/RegisterView"));
const TodosViewRedux = lazy(() => import("./views/TodosViewRedux"));
const RouterHooks = lazy(() => import("./components/RouterHooks"));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <AppBar />
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route path="/routerhooks/">
            <RouterHooks />
          </Route>
          <PublicRoute path="/login" restricted component={LoginView} />
          <PublicRoute path="/register" restricted component={RegisterView} />
          <PrivateRoute path="/todos" component={TodosViewRedux} />
        </Switch>
      </Suspense>
    </>
  );
}

// const mapDispatchToProps = {
//   onGetCurrentUser: getCurrentUser,
// };

export default App;

//  <li>
//    <Link to="/counter">Counter</Link>
//  </li>;

// <Route path="/counter" component={CounterView} />
