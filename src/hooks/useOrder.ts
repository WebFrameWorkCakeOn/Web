import { query, collection, where, getDocs, orderBy } from "firebase/firestore"; // 👈 orderBy 추가
import { useState, useEffect } from "react";
import { db } from "../firebase";
import type { OrderFormValues } from "../schema/orderFormSchema";

export const useOrder = (storeid: number) => {
  const [orders, setOrders] = useState<OrderFormValues[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!storeid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchAllOrders = async () => {
      try {
        const orderQuery = query(
          collection(db, "orders"),
          where("storeid", "==", storeid),
          orderBy("createdAt", "desc")
        );

        const orderSnap = await getDocs(orderQuery);

        const fetchedOrders: OrderFormValues[] = orderSnap.docs.map((doc) => ({
          ...(doc.data() as OrderFormValues),
        }));

        setOrders(fetchedOrders);
      } catch (e) {
        console.error("Order fetch error:", e);
        setError(
          e instanceof Error
            ? e
            : new Error("주문 목록을 불러오는 중 오류가 발생했습니다.")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, [storeid]);

  return { orders, loading, error };
};
