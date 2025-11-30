import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import type { SubmitHandler } from "react-hook-form";
import type { LoginFormData } from "../type/auth";
import { useAuth } from "../context/AuthContext";

export const useAuthLogin = (onSuccess: () => void) => {
  const authInstance = getAuth();
  const { login } = useAuth();
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setFirebaseError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        authInstance,
        data.email,
        data.password
      );
      const user = userCredential.user;

      console.log("로그인 성공:", user.email);
      const idToken = await user.getIdToken();
      console.log("획득한 ID Token:", idToken);
      await login(user);
      onSuccess();
    } catch (error: unknown) {
      console.error("로그인 실패:", error);

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/user-not-found":
            setFirebaseError("등록된 계정이 없습니다.");
            break;
          case "auth/wrong-password":
            setFirebaseError("비밀번호가 틀렸습니다.");
            break;
          case "auth/invalid-email":
            setFirebaseError("유효하지 않은 이메일 형식입니다.");
            break;
          case "auth/too-many-requests":
            setFirebaseError(
              "로그인 시도가 너무 많습니다. 잠시 후 다시 시도하세요."
            );
            break;
          default:
            setFirebaseError("로그인 중 알 수 없는 오류가 발생했습니다.");
        }
      }
    }
  };

  return { onSubmit, firebaseError };
};
