import { useLocation } from "react-router-dom";
import { SearchInputGroup } from "../components/homepage/SearchInputGroup";
import SectionHeader from "../components/homepage/SectionHeader";

import { popularStoresDummyData } from "../dummyData/StoreDummydata";
import StoreCard from "../components/homepage/StoreCard";

const SearchResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const locationQuery = queryParams.get("location");
  const searchQuery = locationQuery ? locationQuery.trim() : "";

  const searchResults = popularStoresDummyData.filter((store) => {
    if (!searchQuery) {
      //filter 원본 수정안함
      return false;
    }
    return store.location.includes(searchQuery);
  });
  console.log(searchResults);
  return (
    <div className="flex flex-col w-full gap-y-6 min-h-screen px-10 py-5 ">
      <div className="flex items-center justify-center gap-x-10">
        <div className="text-3xl font-bold">
          {locationQuery ? `'${locationQuery}'` : "전체"} 검색 결과
        </div>
        <div className="border border-[#000000]/20 rounded-2xl">
          <SearchInputGroup initialTerm={locationQuery || ""} />
        </div>
      </div>
      <div className="px-10 flex flex-col gap-y-6">
        <SectionHeader
          title={`${locationQuery}의 가게`}
          description="검색한 지역에서 원하는 가게를 골라 보세요!"
          linkText=""
          linkTo="/"
        />
        <div className="grid grid-cols-3 grid-rows-2 gap-7 justify-center items-center">
          {searchResults.map((data) => (
            <StoreCard
              key={data.id}
              id={data.id}
              name={data.name}
              rating={data.rating}
              location={data.location}
              description={data.description}
              imageUrl={data.src} // src를 imageUrl로 매핑
            />
          ))}
        </div>

        {searchResults.length === 0 && (
          <div className="w-full text-3xl text-center">
            <span className="text-red-500">{`${locationQuery}`}</span>에
            해당하는 가게가 없습니다..
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
