import { Cake } from "lucide-react";
import { hoverEffect } from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthLogin } from "../hooks/useAuthLogin";
import { useState } from "react";
import { Modal } from "../modal/Modal";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const loginInputCss =
    "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500 transition duration-150";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ mode: "onChange" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const { onSubmit, firebaseError } = useAuthLogin(openModal);

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#FDF2F8] to-[#FFF7ED] flex items-center justify-center p-4">
      <div className="w-full max-w-sm lg:max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-8">
        <button
          className="text-sm font-medium text-gray-600 hover:text-pink-600 cursor-pointer transition duration-150"
          onClick={() => navigate(-1)}
        >
          &larr; 뒤로 가기
        </button>
        <div className="flex flex-col items-center space-y-4">
          <div className="h-20 w-20 bg-pink-100 rounded-full flex items-center justify-center shadow-inner">
            <Cake stroke="#EC4899" fill="#FBCFE8" className="h-12 w-12" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">로그인</h1>

          <p className="text-sm text-gray-500">
            케이크 통합 주문 시스템{" "}
            <span className="font-semibold text-pink-600">cakeON</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {firebaseError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">
                {firebaseError}
              </p>
            </div>
          )}
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
              className={`${loginInputCss} ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="example@cakeon.com"
              {...register("email", {
                required: "이메일은 필수 입력 항목입니다.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "유효한 이메일 형식이 아닙니다.",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

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
              className={`${loginInputCss} ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
              {...register("password", {
                required: "비밀번호는 필수 입력 항목입니다.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8자 이상이어야 합니다.",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-black text-white py-2.5 rounded-lg font-semibold ${hoverEffect} mt-4 shadow-md disabled:opacity-50`}
          >
            {isSubmitting ? "로그인 중..." : "로그인 하기"}
          </button>
        </form>

        <div className="space-y-3">
          <div className="text-center text-sm">
            <a href="#" className={` font-medium ${hoverEffect}`}>
              비밀번호를 잊으셨나요?
            </a>
          </div>
          <div className="text-center text-sm">
            <Link to="/sign-up" className={` font-medium ${hoverEffect}`}>
              회원가입
            </Link>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="로그인 성공!"
        message="환영합니다! 이제 케이크를 주문해 보세요."
        buttonText="확인하고 메인으로 이동"
      />
    </div>
  );
};

export default LoginPage;
