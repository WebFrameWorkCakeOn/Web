import { Link } from "react-router-dom";

export const hoverEffect = "hover:scale-110 duration-600";

export const loginButtonHoverEffect =
  "hover:bg-black hover:text-white transition-colors duration-300";

const Navbar = () => {
  return (
    <nav className="w-full h-20 bg-white px-10">
      <div className="flex items-center justify-between h-full">
        <Link className={`text-black text-4xl ${hoverEffect}`} to={"/"}>
          CAKE ON
        </Link>

        <Link
          className={`text-black text-xl border border-black/20 rounded-2xl w-50 h-12 flex items-center justify-center ${loginButtonHoverEffect}`}
          to={"login"}
        >
          로그인 / 회원가입
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
