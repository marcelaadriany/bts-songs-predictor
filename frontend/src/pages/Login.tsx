import { useState } from "react";
import { Navigate } from "react-router-dom";

import Layout from "../components/Layout";
import { useAuth } from "../contexts/useAuth";

import styles from "./Login.module.css";

export default function Login() {
  const { loginUser, registerUser, isAuthenticated } = useAuth();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    try {
      if (isLoginMode) {
        await loginUser(email, password);
        return;
      }

      await registerUser(username, email, password);

      setSuccess("Cadastro realizado com sucesso! Agora faça login.");
      setIsLoginMode(true);
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    }
  }

  function handleToggleMode() {
    setIsLoginMode(!isLoginMode);
    setError("");
    setSuccess("");
    setUsername("");
    setPassword("");
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <main className={styles.page}>
        <section className={styles.card}>
          <h1 className={styles.title}>{isLoginMode ? "Login" : "Cadastro"}</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            {!isLoginMode && (
              <div className={styles.field}>
                <label className={styles.label} htmlFor="username">
                  Username
                </label>

                <input
                  className={styles.input}
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required={!isLoginMode}
                />
              </div>
            )}

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>

              <input
                className={styles.input}
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">
                Senha
              </label>

              <input
                className={styles.input}
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {success && <p className={styles.success}>{success}</p>}
            {error && <p className={styles.error}>{error}</p>}

            <button className={styles.submitButton} type="submit">
              {isLoginMode ? "Entrar" : "Cadastrar"}
            </button>
          </form>

          <button
            className={styles.toggleButton}
            type="button"
            onClick={handleToggleMode}
          >
            {isLoginMode ? "Criar conta" : "Já tenho uma conta"}
          </button>
        </section>
      </main>
    </Layout>
  );
}
