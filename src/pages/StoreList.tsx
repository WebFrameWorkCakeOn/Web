import StoreListItem from "../components/storeList/StoreListItem";
import { usePopularStores } from "../hooks/usePopularStores";

const StoreList = () => {
  const { stores, loading, error } = usePopularStores();

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
    <div className="w-max-full min-h-screen p-4 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">인기 매장 목록</h2>

      <div className="flex flex-col gap-6 max-w-6xl mx-auto">
        {stores.length === 0 ? (
          <p className="text-gray-500">현재 등록된 인기 매장이 없습니다.</p>
        ) : (
          stores.map((store) => (
            <StoreListItem
              key={store.storeid}
              name={store.name}
              rating={store.rating}
              location={store.location}
              description={store.description}
              imageUrl={store.imageUrl}
              storeid={store.storeid}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StoreList;
