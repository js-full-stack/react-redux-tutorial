import defaultAvatar from "../../img/icon.png";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserName } from "../../Redux/authTodos/";
import { logOut } from "../../Redux/authTodos/";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: 4,
  },
  name: {
    fontWeight: 700,
    marginRight: 12,
  },
};

const UserMenu = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => dispatch(logOut()), [dispatch]);

  const userName = useSelector(getUserName);

  return (
    <div style={styles.container}>
      <img src={defaultAvatar} width="32" style={styles.avatar} alt="avatar" />
      <span style={styles.name}>Welcome, {userName}</span>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   userName: getUserName(state),
//   avatar: defaultAvatar,
// });

export default UserMenu;
