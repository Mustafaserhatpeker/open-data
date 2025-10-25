import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  accessToken: string | null;
  message: string;
  email: string;
  role: "user" | "superAdmin" | "organization" | null;

  login: (email: string, password: string) => Promise<void>;

  register: (
    email: string,
    identityNumber: string,
    name: string,
    surname: string,
    password: string
  ) => Promise<boolean>;

  logout: () => Promise<void>;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuthenticated: false,
  message: "",
  isLoading: false,
  isCheckingAuth: true,
  accessToken: localStorage.getItem("accessToken"),
  email: localStorage.getItem("email") || "",
  role:
    (localStorage.getItem("role") as "user" | "superAdmin" | "organization") ||
    null,

  login: async (email, password) => {
    set({ isLoading: true });

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { accessToken } = response.data.data;

      const payload = jwtDecode(accessToken);
      const role = (payload as any).role;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);

      set({
        isAuthenticated: true,
        isLoading: false,
        accessToken,
        email,
        role,
      });
    } catch (error: any) {
      set({ isLoading: false, isAuthenticated: false });
      throw error;
    }
  },

  register: async (email, password, name, surname, identityNumber) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post("/auth/register", {
        email,
        password,
        name,
        surname,
        identityNumber,
      });
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false, isAuthenticated: false, message: "Giriş Başarısız" });
      return false;
    }
  },

  logout: async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    set({
      isAuthenticated: false,
      accessToken: null,
      email: "",
      role: null,
    });
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    const token = get().accessToken;
    set({
      isAuthenticated: !!token,
      isCheckingAuth: false,
    });
  },
}));
