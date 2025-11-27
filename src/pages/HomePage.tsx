// src/pages/HomePage.tsx

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // getFirestore(firebaseApp)

import SearchBar from "../components/homepage/HomeSearchBar";
import RecommendedCakeCard from "../components/homepage/RecommendedCakeCard";
import SectionHeader from "../components/homepage/SectionHeader";
import PopularStoreCard from "../components/homepage/PopularStoreCard";

// ===== 타입 정의 =====

type PopularStore = {
  id: string;
  name: string;
  rating: number;
  location: string;
  description: string;
  imageUrl: string;
};

type RecommendedCake = {
  id: string;
  name: string;
  store: string;
  rating: number;
  price: number;
  imageUrl: string;
};

// ===== 컴포넌트 =====

const HomePage = () => {
  const [recommendedCakes, setRecommendedCakes] = useState<RecommendedCake[]>(
    []
  );
  const [popularStores, setPopularStores] = useState<PopularStore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cakesSnap = await getDocs(collection(db, "RecommendedCake"));
        const cakes: RecommendedCake[] = cakesSnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<RecommendedCake, "id">),
        }));

        const storesSnap = await getDocs(collection(db, "popularStores"));
        const stores: PopularStore[] = storesSnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<PopularStore, "id">),
        }));

        setRecommendedCakes(cakes);
        setPopularStores(stores);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex flex-col w-full gap-y-6 min-h-screen ">
      <SearchBar />

      <div className="px-10 flex flex-col gap-y-6">
        <SectionHeader
          title="추천케이크"
          description="인기있는 케이크를 만나보세요!"
          linkText="전체 보기"
          linkTo="/"
        />
        <div className="flex justify-center items-center gap-x-5">
          {recommendedCakes.map((data) => (
            <RecommendedCakeCard key={data.id} {...data} />
          ))}
        </div>
      </div>

      <div className="px-10 flex flex-col gap-y-6">
        <SectionHeader
          title="인기가게"
          description="검증된 맛집에서 주문하세요"
          linkText="전체 보기"
          linkTo="/"
        />
        <div className="grid grid-cols-3 grid-rows-2 gap-7 justify-center items-center">
          {popularStores.slice(0, 6).map((data) => (
            <PopularStoreCard key={data.id} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
