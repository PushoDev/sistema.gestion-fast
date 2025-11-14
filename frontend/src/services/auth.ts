import api from "./axios";
import { RegisterData, LoginData } from "../types/auth";

export const registerRequest = (user: RegisterData) => api.post(`/auth/register`, user);

export const loginRequest = (user: LoginData) => api.post(`/auth/login`, user);

export const verifyTokenRequest = () => api.get("/usuarios/me");
