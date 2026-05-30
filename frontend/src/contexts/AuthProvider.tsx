import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { getMe, login, register } from "../api/authService";

type User = {
  id: number;
  username: string;
  email: string;
  score: number;
};

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const isAuthenticated = Boolean(token && user);

  useEffect(() => {
    if (!token) return;

    getMe()
      .then((userData) => {
        setUser(userData);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      });
  }, [token]);

  async function loginUser(email: string, password: string) {
    const response = await login({ email, password });

    localStorage.setItem("token", response.token);
    setToken(response.token);

    const userData = await getMe();
    setUser(userData);
  }

  async function registerUser(
    username: string,
    email: string,
    password: string,
  ) {
    await register({ username, email, password });
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
