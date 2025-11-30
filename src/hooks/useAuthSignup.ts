import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FirebaseError } from "firebase/app";
import type { SignupFormData } from "../type/auth";
import type { SubmitHandler } from "react-hook-form";

export const useAuthSignup = (onSuccess: () => void) => {
  const auth = getAuth();
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setFirebaseError(null);
    setIsSubmitting(true);

    try {
      //  Firebase Auth로 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      //  Firestore에 사용자 데이터 저장
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: data.email,
        name: data.name,
        phone: data.userPhone,
        role: data.role,
        createdAt: new Date().toISOString(),
        emailVerified: false,
        isActive: true,
      });
      onSuccess();
    } catch (error: unknown) {
      console.error("회원가입 실패:", error);

      // Firebase 에러 메시지 처리
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setFirebaseError("이미 사용 중인 이메일 주소입니다.");
            break;
          case "auth/invalid-email":
            setFirebaseError("유효하지 않은 이메일 형식입니다.");
            break;
          case "auth/weak-password":
            setFirebaseError("비밀번호가 너무 약합니다. (8자 이상)");
            break;
          default:
            setFirebaseError(
              "회원가입 중 오류가 발생했습니다. 다시 시도해 주세요."
            );
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, firebaseError, isSubmitting };
};
