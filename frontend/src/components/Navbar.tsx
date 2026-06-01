import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import styles from "./Navbar.module.css";

import { FiHome, FiMusic, FiBarChart2, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        <img
          src="/images/arirang-logo.png"
          alt="Arirang logo"
          className={styles.logoImage}
        />
      </Link>

      <nav className={styles.links}>
        <NavLink
          to="/"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <FiHome />
          Home
        </NavLink>

        <NavLink
          to="/bet"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <FiMusic />
          Bet
        </NavLink>

        <NavLink
          to="/results"
          className={({ isActive }: { isActive: boolean }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          <FiBarChart2 />
          Results
        </NavLink>
      </nav>

      <div className={styles.authArea}>
        {isAuthenticated && user ? (
          <>
            <span className={styles.username}>{user.username}</span>
            <button className={styles.logoutButton} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.loginLink}>
            <FiUser />
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
