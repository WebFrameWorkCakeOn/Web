import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import type { OrderFormValues } from "../type/order";

export const useOrderSubmission = (
  openModal: () => void,
  externalImageUrl?: string | null
) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitOrder = async (data: OrderFormValues) => {
    if (!user) {
      setError(new Error("로그인이 필요합니다."));
      return false;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl = externalImageUrl || "";

      if (!imageUrl && data.file) {
        const storageRef = ref(
          storage,
          `cakeDesigns/${Date.now()}_${data.file.name}`
        );
        const snapshot = await uploadBytes(storageRef, data.file);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "orders"), {
        storeid: data.storeid,
        userId: user.uid,
        userName: data.userName,
        userPhone: data.userPhone,
        pickupDateTime: data.pickupDateTime
          ? data.pickupDateTime.toISOString()
          : null,
        fileName: data.fileName,
        imageUrl,
        selectedSizeIndex: data.selectedSizeIndex,
        selectedFlavorIndex: data.selectedFlavorIndex,
        selectedShapeIndex: data.selectedShapeIndex,
        message: data.message,
        etc: data.etc,
        agreed: data.agreed,
        candleCount: data.candleCount,
        isCoolerBagSelected: data.isCoolerBagSelected,
        cakeSize: data.cakeSize,
        createdAt: serverTimestamp(),
      });

      openModal();
      return true;
    } catch (e) {
      console.error("주문 중 에러 발생:", e);
      setError(
        e instanceof Error
          ? e
          : new Error("주문 데이터 전송 중 알 수 없는 오류가 발생했습니다.")
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitOrder, isSubmitting, error };
};
