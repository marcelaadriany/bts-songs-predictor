import { Link } from "react-router-dom";

export default function Navbar() {
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

        <Link style={styles.link} to="/login">
          Login
        </Link>
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
    gap: "20px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
  },
};
