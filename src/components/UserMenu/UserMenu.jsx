import defaultAvatar from "../../img/icon.png";
import { connect } from "react-redux";
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

const UserMenu = ({ avatar, userName, onLogout }) => {
  // const userName = useSelector((state) => getUserName(state));

  return (
    <div style={styles.container}>
      <img src={avatar} width="32" style={styles.avatar} alt="avatar" />
      <span style={styles.name}>Welcome, {userName}</span>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userName: getUserName(state),
  avatar: defaultAvatar,
});

const mapDispatchToProps = {
  onLogout: logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
