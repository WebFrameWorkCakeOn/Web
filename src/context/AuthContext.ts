import { createContext, useContext } from "react";
import { type User as FBUser } from "firebase/auth";

export interface AppUser {
  uid: string;
  email: string;
  name: string;
  phone: string;
  role: "customer" | "owner";
}

export interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  login: (fbUser: FBUser) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 내에서 사용해야 합니다.");
  }
  return context;
};
