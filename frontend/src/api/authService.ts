import { apiFetch } from "./api";

type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

type AuthResponse = {
  token: string;
};

type UserResponse = {
  id: number;
  username: string;
  email: string;
  score: number;
};

export async function register(data: RegisterRequest): Promise<UserResponse> {
  return apiFetch<UserResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getMe(): Promise<UserResponse> {
  return apiFetch<UserResponse>("/auth/me");
}
