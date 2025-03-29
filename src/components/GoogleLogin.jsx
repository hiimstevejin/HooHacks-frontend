import styles from "./GoogleLogin.module.css";

export default function GoogleLogin({ googleLoginUrl }) {
  // const navigate = useNavigate();

  const handleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      googleLoginUrl,
      "Google Login",
      `width=${width},height=${height},top=${top},left=${left},resizable=no`
    );

    if (!popup) {
      alert("Popup blocked! Please allow popups in your browser settings.");
      return;
    }

    const timer = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(timer);
        window.location.href ="/profile"
      } else {
        try {
          if (popup.location.pathname === "/profile") {
            clearInterval(timer);
            popup.close();
            window.location.href ="/profile"
          }
        } catch (error) {
          console.log(error);
        }
      }
    }, 500);
  };

  return (
    <button onClick={handleLogin} className={styles.google}>
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google Logo"
        className={styles.googleIcon}
      />
      Sign in with Google
    </button>
  );
}
