import SearchBar from "../components/homepage/HomeSearchBar";
import RecommendedCakeCard from "../components/homepage/RecommendedCakeCard";
import { recommendedDummyData } from "../dummyData/recommendedDummyData";
import SectionHeader from "../components/homepage/SectionHeader";

import { popularStoresDummyData } from "../dummyData/StoreDummydata";
import StoreCard from "../components/homepage/StoreCard";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full gap-y-6 min-h-screen pb-10 ">
      <SearchBar />
      <div className="px-10 flex flex-col gap-y-6">
        <SectionHeader
          title="추천케이크"
          description="인기있는 케이크를 만나보세요!"
          linkText="전체 보기"
          linkTo="/"
        />
        <div className="flex justify-center items-center gap-x-5">
          {recommendedDummyData.map((data, i) => (
            <RecommendedCakeCard key={i} {...data} />
          ))}
        </div>
      </div>
      <div className="px-10 flex flex-col gap-y-6">
        <SectionHeader
          title="인기가게"
          description="검증된 맛집에서 주문하세요"
          linkText="전체 보기"
          linkTo="/"
        />
        <div className="grid grid-cols-3 grid-rows-2 gap-7 justify-center items-center">
          {popularStoresDummyData.slice(0, 6).map((data, i) => (
            <StoreCard key={i} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
