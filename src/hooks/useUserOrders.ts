// src/hooks/useUserOrders.ts
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
import { db } from "../firebase"; // firebase.ts 경로
import type { OrderList } from "../type/order"; // types 경로

// 반환될 데이터 구조 정의
interface UseUserOrdersResult {
  orders: OrderList[];
  loading: boolean;
  userUid: string | null;
}

/**
 * 현재 로그인한 사용자의 UID를 기반으로 Firestore에서 주문 목록을 실시간으로 불러오는 커스텀 훅
 */
export const useUserOrders = (): UseUserOrdersResult => {
  const [orders, setOrders] = useState<OrderList[]>([]);
  const [loading, setLoading] = useState(true);
  const [userUid, setUserUid] = useState<string | null>(null);

  // 1. 인증 상태 구독 (UID 얻기)
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
        setOrders([]); // 로그아웃 시 목록 비우기
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []); // 컴포넌트 마운트/언마운트 시에만 실행

  // 2. userUid 변경 시마다 Firestore 구독 설정
  useEffect(() => {
    if (!userUid) {
      setLoading(false);
      // userUid가 null이면 Firebase 구독을 시작할 필요가 없음
      return;
    }

    setLoading(true);

    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("userId", "==", userUid), // 로그인된 사용자의 주문만 필터링
      orderBy("pickupDateTime", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedOrders: OrderList[] = snapshot.docs.map((doc) => {
          const data = doc.data() as DocumentData;

          return {
            id: doc.id,
            // 나머지 필드 매핑
            ...data,
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

    return () => unsubscribe(); // userUid가 변경되거나 컴포넌트 언마운트 시 이전 구독 해제
  }, [userUid]); // userUid가 바뀔 때마다 다시 실행

  return { orders, loading, userUid };
};
