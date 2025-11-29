import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { Cake, CakeSlice, Store } from "lucide-react";
import { hoverEffect } from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import type { SignupFormData } from "../type/auth";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FirebaseError } from "firebase/app";

// 200줄 이내라서.. 컴포넌트 분리하면 타입 정의가 더 복잡할듯,,,!!
const SignupPage = () => {
  const signupInputCss =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500 transition duration-150";
  const navigate = useNavigate();
  const auth = getAuth();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      role: "customer", // 역할 기본값 설정
    },
    mode: "onChange", // 입력 값이 바뀔 때마다 유효성 검사 실행
  });

  const passwordValue = watch("password"); //  비밀번호 실시간 검사를 위해
  const [firebaseError, setFirebaseError] = useState<string | null>(null); //회원가입 인증 오류를 위해
  const [successMessage, setSuccessMessage] = useState<string | null>(null); //성공 메시지 전달을 위해

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setFirebaseError(null);
    setSuccessMessage(null);

    try {
      // 1. Firebase Auth로 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // 2. Firestore에 사용자 데이터 저장
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
      setSuccessMessage("회원가입이 완료되었습니다!");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
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
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#FDF2F8] to-[#FFF7ED] flex items-center justify-center p-4">
      <div className="w-full max-w-sm lg:max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-8">
        {/* 뒤로 가기 버튼 */}
        <button
          className="text-sm font-medium text-gray-600 hover:text-pink-600 cursor-pointer transition duration-150"
          onClick={() => navigate(-1)}
        >
          &larr; 뒤로 가기
        </button>

        {/* 인트로 섹션 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="h-20 w-20 bg-pink-100 rounded-full flex items-center justify-center shadow-inner">
            <Cake stroke="#EC4899" fill="#FBCFE8" className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">회원가입</h1>
          <p className="text-sm text-gray-500">
            새로운 <span className="font-semibold text-pink-600">cakeON</span>{" "}
            계정을 만들어보세요!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 역할 */}
          <div className="space-y-3 pt-4 pb-2 border-t border-b border-gray-100">
            <label className="block text-sm font-bold text-gray-700">
              가입 유형 선택
            </label>
            <Controller
              name="role"
              control={control}
              rules={{ required: "역할을 선택해 주세요." }}
              render={({ field }) => (
                <div className="flex space-x-4">
                  {/* 손님 */}
                  <div
                    onClick={() => field.onChange("customer")}
                    className={`flex-1 p-4 rounded-xl cursor-pointer transition duration-300 shadow-md 
                                          ${
                                            field.value === "customer"
                                              ? "bg-pink-100 border-2 border-pink-600"
                                              : "bg-white border border-gray-300 hover:bg-gray-50"
                                          }`}
                  >
                    <h3 className="text-lg font-semibold mb-1 flex items-center">
                      <div className="flex gap-x-2 w-auto">
                        <CakeSlice stroke="#000000" /> 손님
                      </div>
                      {field.value === "customer" && (
                        <span className="ml-2 text-pink-600 text-xl">✓</span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-500">
                      케이크를 구경하고 주문합니다.
                    </p>
                  </div>

                  {/*  사장  */}
                  <div
                    onClick={() => field.onChange("owner")}
                    className={`flex-1 p-4 rounded-xl cursor-pointer transition duration-300 shadow-md
                                          ${
                                            field.value === "owner"
                                              ? "bg-pink-100 border-2 border-pink-600"
                                              : "bg-white border border-gray-300 hover:bg-gray-50"
                                          }`}
                  >
                    <h3 className="text-lg font-semibold mb-1 flex items-center">
                      <div className="flex gap-x-2 w-auto">
                        <Store stroke="#000000" /> 사장
                      </div>

                      {field.value === "owner" && (
                        <span className="ml-2 text-pink-600 text-xl">✓</span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-500">
                      매장과 주문을 관리합니다.
                    </p>
                  </div>
                </div>
              )}
            />
            {errors.role && (
              <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* 이름 */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              이름
            </label>
            <input
              id="name"
              type="text"
              className={signupInputCss}
              placeholder="홍길동"
              {...register("name", { required: "이름을 입력해 주세요." })}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* 이메일 */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              className={signupInputCss}
              placeholder="example@cakeon.com"
              {...register("email", {
                required: "이메일을 입력해 주세요.",
                validate: (value) =>
                  /^\S+@\S+$/i.test(value) || "이메일 형식으로 입력해 주세요.",
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* 전화번호  */}
          <div>
            <label
              htmlFor="userPhone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              전화번호
            </label>
            <input
              id="userPhone"
              type="tel"
              className={signupInputCss}
              placeholder="010-1234-5678"
              {...register("userPhone", {
                required: "전화번호를 입력해 주세요.",
                pattern: {
                  //하이폰 검사
                  value: /^010-\d{3,4}-\d{4}$/,
                  message: "010-XXXX-XXXX 형식으로 입력해 주세요.",
                },
              })}
            />
            {errors.userPhone && (
              <p className="text-xs text-red-500 mt-1">
                {errors.userPhone.message}
              </p>
            )}
          </div>

          {/* 비밀번호  */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              className={signupInputCss}
              placeholder="•••••••• (8자 이상)"
              {...register("password", {
                required: "비밀번호를 입력해 주세요.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상이어야 합니다.",
                },
              })}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={signupInputCss}
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "비밀번호 확인을 입력해 주세요.",
                validate: (value) =>
                  value === passwordValue || "비밀번호가 일치하지 않습니다.",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {firebaseError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">
                {firebaseError}
              </p>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm text-center font-medium">
                {successMessage}
              </p>
            </div>
          )}

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className={`w-full bg-black text-white py-2.5 rounded-lg font-semibold transition transform ${hoverEffect} mt-4 shadow-md`}
          >
            회원가입 하기
          </button>
        </form>

        <div className="text-center text-sm">
          <Link
            to="/login"
            className={`text- black font-medium ${hoverEffect}`}
          >
            이미 계정이 있으신가요? 로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
