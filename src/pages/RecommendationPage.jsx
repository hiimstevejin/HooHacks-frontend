import Recommendation from "../components/Recommendation";
import UserNav from "../components/Navbar/UserNav";
import styles from "./RecommendationPage.module.css";
import ChatBot from "../components/ChatBot";
import { Link } from "react-router-dom";
import { AiProvider } from "../context/AiContext";
import { AiChatProvider } from "../context/AiChatContext";

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
        <AiChatProvider>
          <ChatBot />
        </AiChatProvider>
      </main>
    </AiProvider>
  );
}

export default RecommendationPage;
