import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import type { PhotoFolioProps } from "../type/store";

interface PhotoFolioState {
  photoFolio: PhotoFolioProps | null;
  loading: boolean;
  error: Error | null;
}

export const usePhotoFolio = (storeid: number): PhotoFolioState => {
  const [photoFolio, setPhotoFolio] = useState<PhotoFolioProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!storeid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchPhotoFolio = async () => {
      try {
        const folioQuery = query(
          collection(db, "StoreImg"),
          where("storeid", "==", storeid)
        );

        const folioSnap = await getDocs(folioQuery);

        if (!folioSnap.empty) {
          const doc = folioSnap.docs[0];

          const fetchedFolio: PhotoFolioProps = {
            ...(doc.data() as PhotoFolioProps),
          };
          setPhotoFolio(fetchedFolio);
        } else {
          setPhotoFolio(null);
          setError(
            new Error(
              `해당 storeid (${storeid})를 가진 포트폴리오를 찾을 수 없습니다.`
            )
          );
        }
      } catch (e) {
        console.error("PhotoFolio fetch error:", e);
        setError(
          e instanceof Error
            ? e
            : new Error("포트폴리오 데이터를 불러오는 중 오류가 발생했습니다.")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoFolio();
  }, [storeid]);

  return { photoFolio, loading, error };
};
