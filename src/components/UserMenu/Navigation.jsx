import React from "react";
import { getIsAuthenticated } from "../../Redux/authTodos";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const styles = {
  link: {
    display: "inline-block",
    textDecoration: "none",
    padding: 12,
    fontWeight: 700,
    color: "#2A363B",
  },
  activeLink: {
    color: "#E84A5F",
  },
};

const Navigation = () => {
  const isAuth = useSelector(getIsAuthenticated);

  return (
    <nav>
      <NavLink
        to="/routerhooks"
        style={styles.link}
        activeStyle={styles.activeLink}
      >
        Router hooks
      </NavLink>
      <NavLink to="/" exact style={styles.link} activeStyle={styles.activeLink}>
        Главная
      </NavLink>

      {isAuth && (
        <NavLink
          to="/todos"
          exact
          style={styles.link}
          activeStyle={styles.activeLink}
        >
          Заметки
        </NavLink>
      )}
    </nav>
  );
};
export default Navigation;
