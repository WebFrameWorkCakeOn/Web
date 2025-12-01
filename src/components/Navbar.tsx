import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const hoverEffect = "transition transform hover:scale-105 duration-400";

export const loginButtonHoverEffect =
  "hover:bg-black hover:text-white transition-colors duration-300";

const Navbar = () => {
  const { user, isLoading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  const linkcss =
    "text-black text-sm cursor-pointer hover:text-black/50 transition duration-150";

  return (
    <nav className="w-full h-20 bg-white px-10 border-b border-[#000000]/15">
      <div className="flex items-center justify-between h-full">
        <Link className={`text-black text-4xl ${hoverEffect}`} to={"/"}>
          CAKE ON
        </Link>

        {isLoading ? (
          // 로딩 상태
          <div className="text-gray-500">인증 상태 확인 중...</div>
        ) : user ? (
          // 로그인 상태
          <div className="flex items-center space-x-6">
            <span className="text-lg font-semibold text-gray-800">
              <Link className={`${linkcss}`} to={"order-list"}>
                안녕하세요, {user.name}님!
              </Link>
            </span>

            {/* 로그아웃 버튼 */}
            <button
              onClick={handleLogout}
              className={`text-black text-xl border border-black/20 rounded-2xl w-30 h-12 flex items-center justify-center ${loginButtonHoverEffect} px-4`}
            >
              로그아웃
            </button>
          </div>
        ) : (
          // 3. 로그아웃 상태
          <Link
            className={`text-black text-xl border border-black/20 rounded-2xl w-50 h-12 flex items-center justify-center ${loginButtonHoverEffect} px-4`}
            to={"login"}
          >
            로그인 / 회원가입
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
