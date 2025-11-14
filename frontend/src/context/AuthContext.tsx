
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { User, RegisterData, LoginData } from "../types/auth";
import {
  loginRequest,
  registerRequest,
  verifyTokenRequest,
} from "../services/auth";
import { AxiosError } from "axios";

export interface AuthContextType {
  signup: (user: RegisterData) => Promise<void>;
  signin: (user: LoginData) => Promise<void>;
  logout: () => void;
  user: User | null;
  isAuthenticated: boolean;
  errors: string[];
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const signup = async (userData: RegisterData) => {
    try {
      const res = await registerRequest(userData);
      const registeredUser = res.data;
      setUser(registeredUser);
      setIsAuthenticated(true);
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string } | string[]>;
      if (axiosError.response) {
        const { data } = axiosError.response;
        if (Array.isArray(data)) {
          return setErrors(data);
        }
        setErrors([data.detail || "Error en el registro"]);
      }
    }
  };

  const signin = async (credentials: LoginData) => {
    try {
      const res = await loginRequest(credentials);
      const { access_token, user_id } = res.data;
      Cookies.set("token", access_token);
      
      // Obtener información del usuario
      const userRes = await verifyTokenRequest();
      setUser(userRes.data);
      setIsAuthenticated(true);
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string } | string[]>;
      if (axiosError.response) {
        const { data } = axiosError.response;
        if (Array.isArray(data)) {
          return setErrors(data);
        }
        setErrors([data.detail || "Error en el inicio de sesión"]);
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest();
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (_err) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
