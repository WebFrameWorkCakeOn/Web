import { Search } from "lucide-react";
import { hoverEffect } from "../Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchInputGroup = ({ initialTerm = "" }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(initialTerm);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // 쿼리 파라미터로 이동
      navigate(`/search-results?location=${searchTerm.trim()}`);
    } else {
      alert("검색할 지역을 입력해 주세요.");
    }
  };

  return (
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </div>
      <button
        className={`w-25 h-12 bg-black text-xl text-white flex items-center justify-center rounded-2xl ${hoverEffect}`}
        onClick={handleSearch}
      >
        검색
      </button>
    </div>
  );
};
