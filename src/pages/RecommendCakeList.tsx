import RecommendedCakeListItem from "../components/recommendCakeList/RecommendedCakeListItem";
import { useRecommendedCakes } from "../hooks/useRecommendedCakes";

import type { RecommendedCakeProps } from "../type/cake";

const RecommendCakeList = () => {
  const {
    cakes: recommendedCakes, // 구조분해 할당 + 별칭
    loading,
    error,
  } = useRecommendedCakes();

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4 bg-white rounded shadow text-red-600">
        오류 발생: {error.message}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4 bg-white rounded shadow text-gray-600">
        로딩중...
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-10">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
        추천 케이크 둘러보기
      </h2>

      <div className="flex flex-col gap-5">
        {recommendedCakes.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            현재 추천되는 케이크가 없습니다.
          </p>
        ) : (
          // 데이터 매핑 및 ListItem 렌더링
          recommendedCakes.map((cake: RecommendedCakeProps) => (
            <RecommendedCakeListItem key={cake.storeid + cake.name} {...cake} />
          ))
        )}
      </div>
    </div>
  );
};

export default RecommendCakeList;
