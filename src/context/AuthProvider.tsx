import React, { useEffect, useState, type ReactNode } from "react";
import {
  getAuth,
  onAuthStateChanged,
  type User as FBUser,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import { AuthContext, type AuthContextType, type AppUser } from "./AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  const fetchUserData = async (uid: string): Promise<AppUser | null> => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        return userDocSnap.data() as AppUser;
      }
      return null;
    } catch (error) {
      console.error("Firestore 사용자 데이터 로드 실패:", error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const appUserData = await fetchUserData(fbUser.uid);
        setUser(appUserData);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  // 로그인 함수
  const login = async (fbUser: FBUser) => {
    setIsLoading(true);
    const appUserData = await fetchUserData(fbUser.uid);
    setUser(appUserData);
    setIsLoading(false);
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
