import { SearchInputGroup } from "./SearchInputGroup";

const SearchBar = () => {
  return (
    <div className="w-full h-80 bg-linear-to-br from-[#FDF2F8] to-[#FFF7ED] flex flex-col items-center justify-center gap-y-4">
      <div className="text-3xl">원하는 케이크를 찾아보세요</div>
      <div className=" text-2xl text-[#717182]">
        특별한 날을 위한 완벽한 케이크가 여기 있습니다
      </div>
      <SearchInputGroup />
    </div>
  );
};

export default SearchBar;
