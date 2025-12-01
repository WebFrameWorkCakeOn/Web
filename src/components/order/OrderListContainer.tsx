// src/components/OrderListContainer.tsx
import { useUserOrders } from "../../hooks/useUserOrders"; // 커스텀 훅 import
import type { OrderList } from "../../type/order";
import OrderListCard from "./OrderListCard";

export default function OrderListContainer() {
  // 훅 호출: 모든 로딩 및 데이터 상태를 여기서 받아옵니다.
  const { orders, loading, userUid } = useUserOrders();

  const handleCardClick = (order: OrderList) => {
    console.log(`${order.userName}님의 주문 상세 페이지로 이동.`);
    // 라우팅 로직 추가 예: router.push(`/orders/${order.id}`)
  };

  // 1. 로딩 상태
  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-medium text-gray-500">
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-black rounded-full"
          role="status"
        ></div>
        <p className="mt-3">주문 목록을 불러오는 중입니다...</p>
      </div>
    );
  }

  // 2. 로그인되지 않은 상태 (userUid가 null이고 로딩이 끝났을 때)
  if (!userUid) {
    return (
      <div className="text-center py-20 text-gray-400 border border-dashed border-gray-300 rounded-lg mx-auto max-w-xl">
        <p className="text-xl font-bold text-gray-700">로그인이 필요합니다.</p>
        <p className="text-sm mt-2">
          주문 목록을 확인하려면 먼저 로그인해주세요.
        </p>
      </div>
    );
  }

  // 3. 주문 목록이 없는 상태
  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 border border-dashed border-gray-300 rounded-lg mx-auto max-w-xl">
        <p className="text-xl font-bold">현재 들어온 주문이 없습니다. 🎉</p>
      </div>
    );
  }

  // 4. 주문 목록 렌더링
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {orders.map((order) => (
        <OrderListCard
          key={order.id || order.pickupDateTime}
          order={order}
          onClick={() => handleCardClick(order)}
        />
      ))}
    </div>
  );
}
