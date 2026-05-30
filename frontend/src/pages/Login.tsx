import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

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
    <div>
      <h1>{isLoginMode ? "Login" : "Cadastro"}</h1>

      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <div>
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required={!isLoginMode}
            />
          </div>
        )}

        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Senha</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">{isLoginMode ? "Entrar" : "Cadastrar"}</button>
      </form>

      <button type="button" onClick={handleToggleMode}>
        {isLoginMode ? "Criar conta" : "Já tenho uma conta"}
      </button>
    </div>
  );
}
