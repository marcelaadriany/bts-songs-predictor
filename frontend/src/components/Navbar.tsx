import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        <img
          src="/images/bts-world-tour-logo.png"
          alt="BTS World Tour Arirang"
          className={styles.logoImage}
        />
      </Link>

      <div className={styles.actions}>
        {isAuthenticated && user ? (
          <>
            <span className={styles.username}>{user.username}</span>

            <button className={styles.logoutButton} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.registerLink}>
              Criar conta
            </Link>

            <Link to="/login" className={styles.loginButton}>
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
