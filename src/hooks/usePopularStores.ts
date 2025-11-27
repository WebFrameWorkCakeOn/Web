import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import type { PopularStore } from "../type/store";

interface PopularStoresState {
  stores: PopularStore[];
  loading: boolean;
  error: Error | null;
}

export const usePopularStores = (): PopularStoresState => {
  const [stores, setStores] = useState<PopularStore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storesSnap = await getDocs(collection(db, "popularStores"));
        const fetchedStores: PopularStore[] = storesSnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<PopularStore, "id">),
        }));
        setStores(fetchedStores);
      } catch (e) {
        console.error("Store fetch error:", e);
        setError(
          e instanceof Error
            ? e
            : new Error("인기 가게 데이터를 불러오는 중 오류가 발생했습니다.")
        );
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  return { stores, loading, error };
};
