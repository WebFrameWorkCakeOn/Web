import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

import type { Store } from "../type/store";

interface StoreState {
  store: Store | null;
  loading: boolean;
  error: Error | null;
}

// storeid는 숫자 타입으로 유지
export const useStore = (storeid: number): StoreState => {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!storeid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchStore = async () => {
      try {
        const storeQuery = query(
          collection(db, "popularStores"),
          where("storeid", "==", storeid)
        );

        const storeSnap = await getDocs(storeQuery);

        if (!storeSnap.empty) {
          const doc = storeSnap.docs[0];
          const fetchedStore: Store = {
            ...(doc.data() as Store),
          };
          setStore(fetchedStore);
        } else {
          setStore(null);
          setError(
            new Error(
              `해당 storeid (${storeid})를 가진 가게를 찾을 수 없습니다.`
            )
          );
        }
      } catch (e) {
        console.error("Store fetch error:", e);
        setError(
          e instanceof Error
            ? e
            : new Error("가게 데이터를 불러오는 중 오류가 발생했습니다.")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [storeid]);

  return { store, loading, error };
};
