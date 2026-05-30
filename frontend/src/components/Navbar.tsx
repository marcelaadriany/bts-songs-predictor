import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>🎤 BTS Surprise Songs</div>

      <div style={styles.links}>
        <Link style={styles.link} to="/">
          Home
        </Link>

        <Link style={styles.link} to="/bet">
          Bet
        </Link>

        <Link style={styles.link} to="/results">
          Results
        </Link>

        {isAuthenticated && user ? (
          <>
            <span style={styles.username}>{user.username}</span>

            <button style={styles.logoutButton} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link style={styles.link} to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    backgroundColor: "#111827",
    color: "white",
    marginBottom: "32px",
  },

  logo: {
    fontWeight: "bold",
    fontSize: "20px",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
  },

  username: {
    fontWeight: "bold",
  },

  logoutButton: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "16px",
  },
};
