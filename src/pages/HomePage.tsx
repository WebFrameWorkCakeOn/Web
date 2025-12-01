import SearchBar from "../components/homepage/HomeSearchBar";
import RecommendedCakeCard from "../components/homepage/RecommendedCakeCard";
import SectionHeader from "../components/homepage/SectionHeader";
import StoreCard from "../components/homepage/StoreCard";
import { usePopularStores } from "../hooks/usePopularStores";
import { useRecommendedCakes } from "../hooks/useRecommendedCakes";

const HomePage = () => {
  const {
    cakes: recommendedCakes, //구조분해 할당 + 별칭!
    loading: cakesLoading,
    error: cakesError,
  } = useRecommendedCakes();
  const {
    stores: popularStores,
    loading: storesLoading,
    error: storesError,
  } = usePopularStores();

  const loading = cakesLoading || storesLoading;
  const error = cakesError || storesError;

  if (error) {
    return <div>오류 발생: {error.message}</div>;
  }

  if (loading) {
    return <div>로딩중...</div>;
  }

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
          {recommendedCakes.map((data) => (
            <RecommendedCakeCard key={data.id} {...data} />
          ))}
        </div>
      </div>

      <div className="px-10 flex flex-col gap-y-6">
        <SectionHeader
          title="인기가게"
          description="검증된 맛집에서 주문하세요"
          linkText="전체 보기"
          linkTo="storelist-page"
        />
        <div className="grid grid-cols-3 grid-rows-2 gap-7 justify-center items-center">
          {popularStores.slice(0, 6).map((data, i) => (
            <StoreCard key={i} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
