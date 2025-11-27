import React from "react";
import type { OrderFormValues } from "../../type/order";
import { CakeSlice } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: OrderFormValues;
}

export const OrderConfirmationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  orderData,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-xl w-1/3 max-w-lg flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지!!
      >
        <h2 className="text-2xl font-bold mb-4 flex gap-x-2 justify-center">
          <CakeSlice className="w-8 h-8 stroke-2 " />
          주문이 완료되었습니다!
        </h2>

        {/* 주문 요약 정보 표시 */}
        <p className="mb-2 text-xl">주문자: {orderData.userName}</p>
        <p className="mb-4 text-xl">
          픽업 일시: {orderData.pickupDateTime?.toLocaleString("ko-KR")}
        </p>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-1/3 "
        >
          확인
        </button>
      </div>
    </div>
  );
};
