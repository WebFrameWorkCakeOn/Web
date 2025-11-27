// src/hooks/useRecommendedCakes.ts

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import type { RecommendedCake } from "../type/cake";

interface RecommendedCakesState {
  cakes: RecommendedCake[];
  loading: boolean;
  error: Error | null;
}

export const useRecommendedCakes = (): RecommendedCakesState => {
  const [cakes, setCakes] = useState<RecommendedCake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const cakesSnap = await getDocs(collection(db, "RecommendedCake"));
        const fetchedCakes: RecommendedCake[] = cakesSnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<RecommendedCake, "id">),
        }));
        setCakes(fetchedCakes);
      } catch (e) {
        console.error("Cake fetch error:", e);
        setError(
          e instanceof Error
            ? e
            : new Error("추천 케이크 데이터를 불러오는 중 오류가 발생했습니다.")
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCakes();
  }, []);

  return { cakes, loading, error };
};
