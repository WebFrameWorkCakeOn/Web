import { useParams } from "react-router-dom";
// ... (나머지 import)
import { useStore } from "../hooks/useStore";
import { usePhotoFolio } from "../hooks/usePhotoFolio";
import Storebar from "../components/Store/Storebar";
import Storeimage from "../components/Store/Storeimage";
import Storeinfo from "../components/Store/Storeinfo";
import Storefp from "../components/Store/Storepf";

const StorePage = () => {
  const { id } = useParams<{ id: string }>();
  //storeid 넘버로 형변환
  const storeIdNumber = id ? parseInt(id, 10) : 0;

  // useStore 훅 호출
  const {
    store,
    loading: storeLoading,
    error: storeError,
  } = useStore(storeIdNumber);

  // usePhotoFolio 훅 호출
  const {
    photoFolio, // photoFolio 객체 전체를 가져옵니다.
    loading: folioLoading,
    error: folioError,
  } = usePhotoFolio(storeIdNumber);

  if (storeLoading || folioLoading) {
    return <p>가게 정보 및 포트폴리오를 불러오는 중입니다...</p>;
  }

  const combinedError = storeError || folioError;
  if (combinedError) {
    return <p className="text-red-600">오류 발생: {combinedError.message}</p>;
  }
  if (!store) {
    return <p>가게 정보를 찾을 수 없습니다. (ID: {storeIdNumber})</p>;
  }

  return (
    <div className="w-max-full min-h-screen p-4 bg-white rounded shadow">
      <Storebar />
      <div className="mt-10 flex gap-5 h-100">
        {/* 이미지 영역 */}
        <Storeimage imageUrl={store.imageUrl} />
        {/* 정보 영역 */}
        <Storeinfo {...store} />
      </div>
      {/* 포트폴리오 영역*/}
      <Storefp cakes={photoFolio?.cakes || []} />
    </div>
  );
};

export default StorePage;
