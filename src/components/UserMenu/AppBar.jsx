import React from "react";
import { useSelector } from "react-redux";
import Navigation from "./Navigation";
import UserMenu from "./UserMenu";
import AuthNav from "./AuthNav";
import { getIsAuthenticated } from "../../Redux/authTodos";

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #2A363B",
  },
};

const AppBar = () => {
  const isAuthenticated = useSelector((state) => getIsAuthenticated(state));
  return (
    <header style={styles.header}>
      <Navigation />
      {isAuthenticated ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.token,
// });

// export default connect(mapStateToProps)(AppBar);

//  const allTodos = useSelector((state) => state.todos.items);
