import { Link } from "react-router-dom";

const Storebar = () => {
  const linkcss =
    "text-black text-sm cursor-pointer hover:text-black/50 transition duration-150";
  return (
    <div className="w-full border-b border-t border-gray-200 bg-white px-4 py-4 flex flex-col">
      <Link className={`${linkcss}`} to={"/"}>
        ← 목록으로 돌아가기
      </Link>
    </div>
  );
};
export default Storebar;
