import { useState } from "react";
import { Navigate } from "react-router-dom";

import Layout from "../components/Layout";
import { useAuth } from "../contexts/useAuth";

import styles from "./Login.module.css";

type Props = {
  initialMode?: "login" | "register";
};

export default function Login({ initialMode = "login" }: Props) {
  const { loginUser, registerUser, isAuthenticated } = useAuth();

  const [isLoginMode, setIsLoginMode] = useState(initialMode === "login");

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
      setError(error instanceof Error ? error.message : "Erro inesperado.");
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
          <h1 className={styles.title}>
            {isLoginMode ? "Login" : "Criar conta"}
          </h1>

          <div className={styles.titleUnderline} />

          <form className={styles.form} onSubmit={handleSubmit}>
            {!isLoginMode && (
              <div className={styles.field}>
                <label htmlFor="username">Username</label>

                <input
                  id="username"
                  type="text"
                  placeholder="Digite seu username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>
            )}

            <div className={styles.field}>
              <label htmlFor="email">Email</label>

              <input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Senha</label>

              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {success && <p className={styles.success}>{success}</p>}
            {error && <p className={styles.error}>{error}</p>}

            <button className={styles.submitButton} type="submit">
              {isLoginMode ? "Login" : "Criar conta"}
            </button>
          </form>

          <div className={styles.divider}>
            <span />
            <p>ou</p>
            <span />
          </div>

          <p className={styles.switchText}>
            {isLoginMode ? "Ainda não tem uma conta?" : "Já tem uma conta?"}{" "}
            <button type="button" onClick={handleToggleMode}>
              {isLoginMode ? "Criar conta" : "Fazer login"}
            </button>
          </p>
        </section>
      </main>
    </Layout>
  );
}
