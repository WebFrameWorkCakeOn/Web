import { useNavigate } from "react-router-dom";
import { Store, Cog } from "lucide-react";
import localStoreCover from "../assets/storeImg/store1.png";
import { StoreStatsBar } from "../components/mystore/StoreStatsBar";
import { OrderListItem } from "../components/mystore/OrderListItem";
import { initialStoreStats, dummyOrders } from "../dummyData/dummyOrders";

const MyStoreListPage = () => {
  const navigate = useNavigate();

  // 더미데이터 사용
  const storeStats = initialStoreStats;
  const orders = dummyOrders;

  const storeCoverImg = localStoreCover;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <div className="w-full max-w-7xl mx-auto px-5 py-10">
        <div className="flex items-center mb-6 bg-white p-3 rounded-xl border border-gray-200 w-fit shadow-sm">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 text-base">
            <Store className="h-5 w-5" />{" "}
          </div>
          <div>
            <div className="flex items-center">
              <h2 className="text-base font-semibold text-gray-900 mr-3">
                내 가게 관리
              </h2>
              <p className="text-sm text-gray-500 border-l border-gray-200 pl-3 m-0">
                3개의 가게를 운영중입니다
              </p>
            </div>
          </div>
        </div>

        <div
          className="w-full h-60 rounded-2xl mb-8 bg-cover bg-center relative overflow-hidden shadow-sm"
          style={{ backgroundImage: `url(${storeCoverImg})` }}
        >
          <div className="absolute bottom-0 left-0 w-full p-8 bg-linear-to-t from-black/70 to-transparent flex flex-col justify-end">
            <h1 className="text-white text-3xl font-extrabold mb-2 drop-shadow-md">
              케이크 팔아요
            </h1>
            <p className="text-gray-200 text-base font-medium">
              직접 디자인하는 스페셜한 커스텀 케이크!
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <StoreStatsBar stats={storeStats} />

          <div className="bg-white rounded-xl p-6 flex justify-between items-center shadow-sm border border-gray-200">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                메뉴 관리
              </h3>
              <p className="text-sm text-gray-500">
                현재 4개의 메뉴가 등록되어 있습니다
              </p>
            </div>
            <button
              className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center hover:bg-gray-800 transition-colors"
              onClick={() => navigate("/manage-items")}
            >
              <span className="mr-1.5">
                <Cog className="h-4 w-4" />
              </span>
              메뉴 관리
            </button>
          </div>

          {/* 주문 목록 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">주문 목록</h3>
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <OrderListItem key={order.id} order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStoreListPage;
