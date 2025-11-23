import { Search } from "lucide-react";
import { hoverEffect } from "../Navbar";

const SearchBar = () => {
  return (
    <div className="w-full h-80 bg-linear-to-br from-[#FDF2F8] to-[#FFF7ED] flex flex-col items-center justify-center gap-y-4">
      <div className="text-3xl">원하는 케이크를 찾아보세요</div>
      <div className=" text-2xl text-[#717182]">
        특별한 날을 위한 완벽한 케이크가 여기 있습니다
      </div>
      <div className="w-210 h-16 rounded-2xl bg-white flex justify-between items-center px-10">
        <div className="flex items-center justify-center gap-x-5">
          <Search
            size={30} // 아이콘 크기
            color="#333" // 아이콘 색상
            strokeWidth={2} // 아이콘 선 굵기
          />
          <input
            type="text"
            className=" w-130 h-12 px-3 bg-[#F3F3F5] rounded-xl"
            placeholder="지역을 입력하세요.."
          />
        </div>
        <button
          className={`w-25 h-12 bg-black text-xl text-white flex items-center justify-center rounded-2xl ${hoverEffect}`}
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
