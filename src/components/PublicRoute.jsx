import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthenticated } from "../Redux/authTodos/";

const PublicRoute = ({ component: Component, ...routeProps }) => {
  const isAuth = useSelector((state) => getIsAuthenticated(state));

  return (
    <Route
      {...routeProps}
      render={(props) =>
        isAuth && routeProps.restricted ? (
          <Redirect to="/todos" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

// const PublicRoute = ({ ...rest }) => {
//   const isAuth = useSelector((state) => getIsAuthenticated(state));
//   return isAuth ? <Redirect to="/todos" /> : <Route {...rest} />;
// };

export default PublicRoute;
