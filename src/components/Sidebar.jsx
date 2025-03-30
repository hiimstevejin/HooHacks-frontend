import styles from "./Sidebar.module.css";
import { Link, Outlet } from "react-router-dom";
import AppNav from "./Navbar/AppNav";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.linkContainer}>
        <Link to="/profile" className="bta">Back</Link>
        <Link to="/recommendation" className="buttonShine">
          Ask AI
        </Link>
      </div>
      <AppNav />

      <Outlet />
    </div>
  );
}

export default Sidebar;
