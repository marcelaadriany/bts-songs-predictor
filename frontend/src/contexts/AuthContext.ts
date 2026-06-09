import { createContext } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  score: number;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  loginUser: (email: string, password: string) => Promise<void>;

  registerUser: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;

  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
