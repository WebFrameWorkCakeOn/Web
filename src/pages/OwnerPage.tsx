import { useNavigate } from "react-router-dom";
import storeImg1 from "../assets/storeImg/store1.png";
import storeImg2 from "../assets/storeImg/store2.png";
import storeImg3 from "../assets/storeImg/store3.png";

const OwnerPage1 = () => {
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

  return (
    <div className="font-pretendard bg-gray-50 min-h-screen flex flex-col">
      {/* --- Main Content --- */}
      <main className="p-10 max-w-7xl mx-auto w-full box-border">
        {/* Title Section */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <div className="flex items-center mb-5 bg-white p-3 px-5 rounded-lg shadow-sm w-fit">
              <div className="mr-2.5 text-lg">🏠</div>
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
            onClick={() => navigate("/owner-page5")}
          >
            <span className="text-lg mr-1.5">+</span>새 가게 추가
          </button>
        </div>

        {/* Section Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          운영 중인 가게
        </h2>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col h-[420px]"
            >
              {/* Card Image Area */}
              <div
                className="h-48 w-full bg-gray-200 bg-cover bg-center"
                style={{ backgroundImage: `url(${store.image})` }}
              ></div>

              {/* Card Content Area */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 mt-0">
                      {store.name}
                    </h3>
                    <p className="text-sm text-gray-600 m-0 leading-relaxed">
                      {store.description}
                    </p>
                  </div>

                  {/* Stats Row */}
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">평점</span>
                      <span className="font-semibold text-yellow-700">
                        ⭐ {store.rating}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">총 주문</span>
                      <span className="font-semibold text-gray-900">
                        {store.totalOrders}건
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Status Badge */}
                  <div className="bg-blue-50 text-blue-600 py-2 px-3 rounded-md text-sm font-semibold mb-auto flex items-center w-fit">
                    <span className="flex items-center">
                      제조중 {store.preparing}건
                    </span>
                  </div>

                  {/* Manage Button */}
                  <button
                    className="w-full bg-gray-900 text-white border-none py-3.5 rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center mt-5 transition duration-200 hover:bg-gray-700"
                    onClick={() => navigate("/owner-page2")}
                  >
                    <span className="mr-1.5">⚙️</span>
                    가게 관리하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OwnerPage1;
