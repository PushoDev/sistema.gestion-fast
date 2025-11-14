import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rol: z.string().optional().default("usuario"),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  fecha_creacion: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_id: number;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
}
