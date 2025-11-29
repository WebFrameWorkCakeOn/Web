// OrderPage.tsx
import { useForm, FormProvider } from "react-hook-form";
import { OrderUserInfoForm } from "../components/order/OrderUserInfoForm";
import { OrderPickupDateTime } from "../components/order/OrderPickupDateTime";
import { OrderNotices } from "../components/order/OrderNotices";
import { OrderCakeSizeSelector } from "../components/order/OrderCakeSizeSelector";
import { OrderFlavorSelector } from "../components/order/OrderFlavorSelector";
import { OrderShapeSelector } from "../components/order/OrderShapeSelector";
import { OrderMessageForm } from "../components/order/OrderMessageForm";
import { OrderEtcForm } from "../components/order/OrderEtcForm";
import { OrderDesignUpload } from "../components/order/OrderDesignUpload";
import { OrderAddsOptions } from "../components/order/OrderAddsOptions";
import "react-datepicker/dist/react-datepicker.css";
import {
  type OrderFormValues,
  CUSTOM_CAKE_DATA,
  FLAVOR_OPTIONS,
  SHAPE_OPTIONS,
} from "../type/order";
import { OrderSummary } from "../components/order/OrderSummary";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema } from "../schema/orderFormSchema";
import { useState } from "react";
import { OrderConfirmationModal } from "../components/order/OrderConfirmationModal";
import { useNavigate } from "react-router-dom";
import { storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useEffect } from "react";

export default function OrderPage() {
  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        console.log("익명 인증 성공");
      })
      .catch((error) => {
        console.error("익명 인증 실패", error);
      });
  }, []);

  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      userName: "",
      userPhone: "",
      pickupDateTime: null,
      fileName: "",
      selectedSizeIndex: null,
      selectedFlavorIndex: null,
      selectedShapeIndex: null,
      message: "",
      etc: "",
      agreed: false,
      candleCount: 0,
      isCoolerBagSelected: false,
      cakeSize: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const selectedSizeIndex = watch("selectedSizeIndex");
  const selectedFlavorIndex = watch("selectedFlavorIndex");
  const selectedShapeIndex = watch("selectedShapeIndex");
  const pickupDateTime = watch("pickupDateTime");
  const message = watch("message");
  const etc = watch("etc");
  const isCoolerBagSelected = watch("isCoolerBagSelected");
  const watchedValues = watch();

  const orderFormCss =
    "w-full p-10 h-auto border border-[#000000]/15 flex flex-col gap-y-6 rounded-2xl";

  const toggleCoolerBag = () => {
    setValue("isCoolerBagSelected", !isCoolerBagSelected);
  };
  //주문 하면 홈으로
  const navigate = useNavigate();
  const handleOrderComplete = () => {
    navigate("/", { state: { message: "주문 성공!" } });
  };

  // 모달 상태 + 함수
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    handleOrderComplete();
  };

  const onSubmit = async (data: OrderFormValues) => {
    try {
      // 1. 이미지 파일이 있으면 Storage에 업로드
      let imageUrl = "";
      if (data.file) {
        const storageRef = ref(
          storage,
          `cakeDesigns/${Date.now()}_${data.file.name}`
        );
        const snapshot = await uploadBytes(storageRef, data.file);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. Firestore에 주문 데이터 저장 (이미지 URL 포함)
      await addDoc(collection(db, "orders"), {
        userName: data.userName,
        userPhone: data.userPhone,
        pickupDateTime: data.pickupDateTime
          ? data.pickupDateTime.toISOString()
          : null,
        fileName: data.fileName,
        imageUrl: imageUrl, // Storage에 업로드된 이미지 URL
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

      console.log("최종 주문 데이터:", data);
      openModal();
    } catch (error) {
      console.error("주문 중 에러 발생:", error);
      alert("주문 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full flex justify-center mt-8">
        <div className="w-2/3">
          <button
            className="text-sm font-medium text-gray-600 hover:text-pink-600 cursor-pointer transition duration-150"
            onClick={() => navigate(-1)}
          >
            &larr; 뒤로 가기
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="min-h-screen pb-10 w-full flex justify-center">
          <div className="h-full w-2/3 flex flex-col gap-y-8 justify-center">
            {/* 주문자 정보 */}
            <div className={orderFormCss}>
              <OrderUserInfoForm
                register={register}
                errorUserName={errors.userName}
                errorUserPhone={errors.userPhone}
              />
            </div>
            {/* 픽업 날짜 & 시간 */}
            <div className={orderFormCss}>
              <OrderPickupDateTime
                control={control}
                setValue={setValue}
                value={pickupDateTime}
                error={errors.pickupDateTime}
              />
            </div>
            {/* 케이크 디자인 첨부 */}
            <div className={orderFormCss}>
              <OrderDesignUpload
                register={register}
                setValue={setValue}
                fileName={watch("fileName")}
              />
            </div>
            {/* 케이크 사이즈 선택 */}
            <div className={orderFormCss}>
              <OrderCakeSizeSelector
                sizes={CUSTOM_CAKE_DATA}
                setValue={setValue}
                selectedSize={selectedSizeIndex}
                error={errors.selectedSizeIndex}
              />
            </div>
            {/* 시트 맛 선택 */}
            <div className={orderFormCss}>
              <OrderFlavorSelector
                flavors={FLAVOR_OPTIONS}
                registerFlavor={register("selectedFlavorIndex", {
                  required: true,
                })}
                selectedFlavor={selectedFlavorIndex}
                error={errors.selectedFlavorIndex}
              />
            </div>
            {/* 모양 선택 */}
            <div className={orderFormCss}>
              <OrderShapeSelector
                shapes={SHAPE_OPTIONS}
                selectedShape={selectedShapeIndex}
                setValue={setValue}
                error={errors.selectedShapeIndex}
              />
            </div>
            {/* 주문 문구 */}
            <div className={orderFormCss}>
              <OrderMessageForm
                registerMessage={register("message", { required: false })}
                message={message}
                error={errors.message}
              />
            </div>
            {/* 기타 요청사항 */}
            <div className={orderFormCss}>
              <OrderEtcForm
                registerEtc={register("etc", { required: false })}
                etc={etc}
                error={errors.etc}
              />
            </div>
            {/* 초 갯수, 보냉백 옵션 */}
            <div className={orderFormCss}>
              <OrderAddsOptions
                registerCandleCount={register("candleCount")}
                isCoolerBagSelected={isCoolerBagSelected}
                toggleCoolerBag={toggleCoolerBag}
              />
            </div>
            {/* 필독 사항 */}
            <div className={orderFormCss}>
              <OrderNotices
                registerAgree={register("agreed", { required: true })}
                error={errors.agreed}
              />
            </div>
            {/* 주문 요악 */}
            <OrderSummary
              values={watchedValues}
              cakeSizes={CUSTOM_CAKE_DATA}
              flavorOptions={FLAVOR_OPTIONS}
              shapeOptions={SHAPE_OPTIONS}
            />
            <button
              type="submit"
              disabled={!isValid}
              className={`
            mt-8 px-6 py-3 w-full bg-blue-500 text-white rounded-xl 
            transition-opacity
            
            ${!isValid ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}
          `}
            >
              주문하기
            </button>
            <OrderConfirmationModal
              isOpen={isModalOpen}
              onClose={closeModal}
              orderData={watchedValues}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
