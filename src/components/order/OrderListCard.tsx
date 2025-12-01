import {
  Clock,
  User,
  Phone,
  MessageSquare,
  Snowflake,
  ChevronRight,
  Flame,
} from "lucide-react";
import type { OrderList } from "../../type/order";
interface Timestamp {
  toDate: () => Date;
  seconds: number;
  nanoseconds: number;
}

const FLAVOR_MAP: Record<string, string> = { "1": "바닐라", "2": "초코" };
const SHAPE_MAP: Record<number, string> = { 1: "원형", 2: "하트" };
type DateValue = string | Date | Timestamp | undefined;

interface OrderListCardProps {
  order: OrderList;
  onClick: () => void; // 부모 컴포넌트(Container)에서 전달받는 클릭 이벤트 핸들러
}

export default function OrderListCard({ order, onClick }: OrderListCardProps) {
  // 픽업 날짜 포맷팅 함수
  const formatPickupDate = (isoString: string | undefined) => {
    if (!isoString) return "날짜 정보 없음";
    // Firestore Timestamp나 ISO string 모두 처리 가능하도록 new Date() 사용
    const date = new Date(isoString);
    return date.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDateObject = (dateValue: DateValue): Date | null => {
    if (!dateValue) return null;

    // 1. Firebase Timestamp 객체인 경우
    // 'instanceof' 대신 'toDate' 메서드의 존재 여부를 확인합니다. (Duck Typing)
    if (
      typeof dateValue === "object" &&
      "toDate" in dateValue &&
      typeof (dateValue as Timestamp).toDate === "function"
    ) {
      return (dateValue as Timestamp).toDate();
    }

    // 2. 문자열 (ISO 또는 일반)인 경우
    if (typeof dateValue === "string") {
      const date = new Date(dateValue);
      // Invalid Date인지 확인
      return isNaN(date.getTime()) ? null : date;
    }

    // 3. 이미 Date 객체인 경우
    if (dateValue instanceof Date) {
      return dateValue;
    }

    return null;
  };

  // 주문 작성일 포맷팅 함수
  const formatCreatedDate = (dateValue: string | undefined) => {
    const date = getDateObject(dateValue);
    if (!date) return "작성일 정보 없음";

    return date.toLocaleDateString("ko-KR");
  };

  return (
    <div
      onClick={onClick}
      // 흰 배경에 얇은 테두리, 호버 시 검은색 테두리로 강조
      className="group relative flex flex-col md:flex-row bg-white border border-gray-200 hover:border-black transition-all duration-300 shadow-sm hover:shadow-md rounded-lg overflow-hidden cursor-pointer"
    >
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-sm">
            {order.agreed ? "주문확인" : "대기중"}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            작성일: {formatCreatedDate(order.createdAt)}
          </span>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xl font-black mb-1 text-gray-900">
            <Clock className="w-5 h-5" />
            {formatPickupDate(order.pickupDateTime)}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 pl-1">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" /> {order.userName}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> {order.userPhone}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md border border-gray-100 group-hover:bg-gray-100 transition-colors">
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm font-bold text-gray-800 mb-2">
            <span>{order.cakeSize}</span>
            <span className="text-gray-300 font-light">|</span>
            <span>
              {SHAPE_MAP[order.selectedShapeIndex] || "모양 정보 없음"}
            </span>
            <span className="text-gray-300 font-light">|</span>
            <span>
              {FLAVOR_MAP[order.selectedFlavorIndex] || "맛 정보 없음"}
            </span>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600 italic mb-2">
            <MessageSquare className="w-3.5 h-3.5 mt-1 shrink-0" />
            <span className="line-clamp-1">"{order.message}"</span>
          </div>

          <div className="flex gap-3 text-xs text-gray-500 font-medium border-t border-gray-200 pt-2 mt-2">
            {order.isCoolerBagSelected && (
              <span className="flex items-center gap-1 text-blue-600">
                <Snowflake className="w-3 h-3" /> 보냉백
              </span>
            )}
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-500" />
              <span>초 {order.candleCount}개</span>
            </span>
          </div>
        </div>
      </div>

      <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0 bg-gray-100 border-t md:border-t-0 md:border-l border-gray-200">
        {order.imageUrl && order.imageUrl !== "" && (
          <img
            src={order.imageUrl}
            alt="Cake Design"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black/80 text-white p-2 rounded-full transition-opacity duration-300">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
