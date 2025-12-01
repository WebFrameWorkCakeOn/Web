import React from "react";
import type { OrderListItemData } from "../../type/mystore";

interface OrderItemProps {
  order: OrderListItemData;
}

export const OrderListItem: React.FC<OrderItemProps> = ({ order }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
    <div className="flex justify-between items-start mb-4">
      <div>
        <div className="text-base font-bold text-gray-900 mb-1">
          주문번호: {order.id}
        </div>
        <div className="text-sm text-gray-500">{order.timeAgo}</div>
      </div>
      <div
        className={`px-3 py-1.5 rounded-full text-[13px] font-semibold flex items-center ${
          order.status === "완료"
            ? "bg-green-100 text-green-800"
            : "bg-blue-100 text-blue-800"
        }`}
      >
        <span className="ml-1">{order.status}</span>
      </div>
    </div>

    <div className="h-px bg-gray-200 my-4"></div>

    {/* 주문 아이템 목록 */}
    <div className="flex flex-col gap-3">
      {order.items.map((item, i) => (
        <div key={i} className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 bg-gray-100 rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <div>
              <div className="text-[15px] font-semibold text-gray-900 mb-0.5">
                {item.name}
              </div>
              <div className="text-[13px] text-gray-500">{item.count}개</div>
            </div>
          </div>
          <div className="text-[15px] font-semibold text-gray-900">
            {item.price.toLocaleString()}원
          </div>
        </div>
      ))}
    </div>

    <div className="h-px bg-gray-200 my-4"></div>

    {/*총 금액*/}
    <div className="flex justify-between items-center mt-4">
      <span className="text-[15px] font-semibold text-gray-700">총 금액</span>
      <span className="text-lg font-bold text-[#E17100]">
        {order.totalPrice.toLocaleString()}원
      </span>
    </div>
  </div>
);
