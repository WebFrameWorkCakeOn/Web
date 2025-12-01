import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase"; // firebase.ts 경로
import type { OrderList } from "../../type/order"; // types 경로
import OrderListCard from "./OrderListCard";

export default function OrderListContainer() {
  const [orders, setOrders] = useState<OrderList[]>([]);
  const [loading, setLoading] = useState(true);
  const [userUid, setUserUid] = useState<string | null>(null);

  // 인증 상태 구독 (UID 얻기)
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
        setOrders([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // userUid 변경 시마다 Firestore 구독 설정
  useEffect(() => {
    if (!userUid) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("userId", "==", userUid),
      orderBy("pickupDateTime", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedOrders: OrderList[] = snapshot.docs.map((doc) => {
          const data = doc.data() as DocumentData;

          return {
            id: doc.id,
            agreed: data.agreed,
            cakeSize: data.cakeSize,
            candleCount: data.candleCount,
            createdAt: data.createdAt,
            etc: data.etc,
            fileName: data.fileName,
            imageUrl: data.imageUrl,
            isCoolerBagSelected: data.isCoolerBagSelected,
            message: data.message,
            pickupDateTime: data.pickupDateTime,
            selectedFlavorIndex: data.selectedFlavorIndex,
            selectedShapeIndex: data.selectedShapeIndex,
            selectedSizeIndex: data.selectedSizeIndex,
            userName: data.userName,
            userPhone: data.userPhone,
          } as OrderList;
        });

        setOrders(fetchedOrders);
        setLoading(false);
      },
      (error) => {
        console.error("데이터 로드 에러:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userUid]);

  const handleCardClick = (order: OrderList) => {
    console.log(`${order.userName}님의 주문 상세 페이지로 이동.`);
    // 라우팅 로직 추가 예: router.push(`/orders/${order.id}`)
  };

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

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 border border-dashed border-gray-300 rounded-lg mx-auto max-w-xl">
        <p className="text-xl font-bold">현재 들어온 주문이 없습니다. 🎉</p>
      </div>
    );
  }

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
