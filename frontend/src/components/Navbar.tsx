import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiLogOut, FiUser, FiCalendar } from "react-icons/fi";

import { useAuth } from "../contexts/useAuth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setIsMenuOpen(false);
  }

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
          <div className={styles.userMenu}>
            <button
              type="button"
              className={styles.userButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FiUser className={styles.userIcon} />

              <span>{user.username}</span>

              <FiChevronDown
                className={`${styles.chevron} ${
                  isMenuOpen ? styles.chevronOpen : ""
                }`}
              />
            </button>

            {isMenuOpen && (
              <div className={styles.dropdown}>
                <Link
                  to="/my-bets"
                  className={styles.dropdownItem}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiCalendar />
                  Ver minhas apostas
                </Link>

                <button
                  type="button"
                  className={styles.dropdownItem}
                  onClick={handleLogout}
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/register" className={styles.registerLink}>
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
