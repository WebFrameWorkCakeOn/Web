import { useNavigate } from "react-router-dom";
import storeImg1 from "../assets/storeImg/store1.png";
import storeImg2 from "../assets/storeImg/store2.png";
import storeImg3 from "../assets/storeImg/store3.png";
import { Store } from "lucide-react";
import StoreCard from "../components/mystore/StoreCard";

const MyStorePage = () => {
  const navigate = useNavigate();

  const stores = [
    {
      id: 1,
      name: "베이커리24",
      description: "아침식사로 좋은 신선한 빵과 베이커리 전문점.",
      rating: 4.8,
      totalOrders: 3,
      preparing: 1,
      image: storeImg1,
    },
    {
      id: 2,
      name: "카페모카",
      description: "특색 있는 모카 커피와 디저트가 유명한 카페.",
      rating: 4.7,
      totalOrders: 1,
      preparing: 1,
      image: storeImg2,
    },
    {
      id: 3,
      name: "플레인케이크",
      description: "전통적인 케이크와 디저트를 제공하는 따뜻한 분위기.",
      rating: 4.8,
      totalOrders: 1,
      preparing: 1,
      image: storeImg3,
    },
  ];

  const handleManageClick = () => {
    navigate(`/mystoreList-page`);
  };

  return (
    <div className="font-pretendard bg-gray-50 min-h-screen flex flex-col">
      <main className="p-10 max-w-7xl mx-auto w-full box-border">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <div className="flex items-center mb-5 bg-white p-3 px-5 rounded-lg shadow-sm w-fit">
              <div className="mr-2.5 text-lg">
                <Store className="w-7 h-7"></Store>
              </div>
              <div className="text-base font-semibold text-gray-900 mr-3">
                내 가게 관리
              </div>
              <div className="text-sm text-gray-500 border-l border-gray-200 pl-3">
                3개의 가게를 운영중입니다
              </div>
            </div>
          </div>
          <button
            className="flex items-center bg-gray-900 text-white border-none py-2.5 px-5 rounded-lg text-sm font-medium cursor-pointer mt-2 transition duration-200 hover:bg-gray-700"
            onClick={() => navigate("/add-store")}
          >
            <span className="text-lg mr-1.5">+</span>새 가게 추가
          </button>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          운영 중인 가게
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <StoreCard
              key={store.id}
              {...store}
              onManageClick={handleManageClick}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyStorePage;
