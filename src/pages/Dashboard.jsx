import styles from "./Dashboard.module.css";
import Sidebar from "../components/Sidebar";
import WorldMap from "../components/WorldMap";
import UserNav from "../components/Navbar/UserNav";

function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <UserNav />

      <div className={styles.mainContent}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <WorldMap />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
