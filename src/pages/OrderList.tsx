import OrderListContainer from "../components/order/OrderListContainer"; // 컨테이너 컴포넌트 호출

export const OrderListPage = () => {
  return (
    <div className="min-h-screen bg-white p-6 md:p-12 font-sans">
      <header className="max-w-3xl mx-auto mb-8 flex justify-between items-end border-b-2 border-black pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            ORDER LIST
          </h1>
          <p className="text-sm text-gray-500 mt-1">실시간 주문 현황</p>
        </div>
      </header>

      <OrderListContainer />
    </div>
  );
};

export default OrderListPage;
