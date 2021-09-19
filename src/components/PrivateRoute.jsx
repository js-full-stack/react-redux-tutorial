import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthenticated } from "../Redux/authTodos/";

// const PrivateRoute = ({ children, ...rest }) => {
//   const isAuth = useSelector((state) => getIsAuthenticated(state));
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         isAuth ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

const PrivateRoute = ({ ...rest }) => {
  const isAuth = useSelector((state) => getIsAuthenticated(state));
  return isAuth ? <Route {...rest} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
