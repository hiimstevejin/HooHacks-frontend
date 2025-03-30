import Recommendation from "../components/Recommendation";
import UserNav from "../components/Navbar/UserNav";
import styles from "./RecommendationPage.module.css";
import ChatBot from "../components/ChatBot";
import Chat from "../components/Chat";
import { Link } from "react-router-dom";
import { AiProvider } from "../context/AiContext";

function RecommendationPage() {
  return (
    <AiProvider>
    <main className={styles.background}>
      <UserNav />
      <div className={styles.mainContent}>
        <h1>Ai Recommendation</h1>
        <Recommendation />
        <Link to="/dashboard" className="bta">
          Back
        </Link>
      </div>
      <ChatBot />
    </main>
    </AiProvider>
  );
}

export default RecommendationPage;
