import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../Logos/Logo";

import styles from "./UserNav.module.css";

export default function UserNav() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/");
  }
  return (
    <div className={styles.nav}>
      <Logo />
      <div className={styles.navItems}>
        <Link to="/profile">
          {/* {user.photo && <img src={user.photo} alt="Profile" width="100" />} */}
          <img src="/profile-placeholder.jpg" alt="" />
        </Link>
        <h2>{user.name}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
