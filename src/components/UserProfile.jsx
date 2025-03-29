import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserProfile() {
  const naviagte = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    naviagte("/");
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      {user.photo && <img src={user.photo} alt="Profile" width="100" />}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
