import { useForm, FormProvider } from "react-hook-form";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

// Context 및 훅 import
import { useAuth } from "../context/AuthContext";
import { useOrderSubmission } from "../hooks/useOrderSubmission";

// 컴포넌트 import
import { OrderUserInfoForm } from "../components/order/OrderUserInfoForm";
import { OrderPickupDateTime } from "../components/order/OrderPickupDateTime";
import { OrderNotices } from "../components/order/OrderNotices";
import { OrderCakeSizeSelector } from "../components/order/OrderCakeSizeSelector";
import { OrderFlavorSelector } from "../components/order/OrderFlavorSelector";
import { OrderShapeSelector } from "../components/order/OrderShapeSelector";
import { OrderMessageForm } from "../components/order/OrderMessageForm";
import { OrderEtcForm } from "../components/order/OrderEtcForm";
import { OrderAddsOptions } from "../components/order/OrderAddsOptions";
import { OrderSummary } from "../components/order/OrderSummary";
import { OrderConfirmationModal } from "../components/order/OrderConfirmationModal";
import BackButton from "../components/BackButton";

// 타입 및 스키마 import
import "react-datepicker/dist/react-datepicker.css";
import {
  type OrderFormValues,
  CUSTOM_CAKE_DATA,
  FLAVOR_OPTIONS,
  SHAPE_OPTIONS,
} from "../type/order";
import { orderFormSchema } from "../schema/orderFormSchema";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const storeIdNumber = id ? parseInt(id, 10) : 0;
  const navigate = useNavigate();
  const location = useLocation();
  const { cakeImage, cakeNotice } = location.state || {};

  const { user, isLoading: authLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      storeid: storeIdNumber,
      userName: user?.name || "",
      userPhone: "",
      pickupDateTime: null,
      fileName: cakeImage || "",
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

  const handleOrderComplete = () => {
    navigate("/", { replace: true });
  }; // 주문 완료 후 홈으로 이동
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    handleOrderComplete();
  };

  const {
    submitOrder,
    isSubmitting,
    error: submitError,
  } = useOrderSubmission(openModal, cakeImage);

  // 유저 정보 못받으면 로그인으로
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [authLoading, user, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>사용자 인증 확인 중...</p>
      </div>
    );
  }

  const watchedValues = watch();
  const {
    selectedSizeIndex,
    selectedFlavorIndex,
    selectedShapeIndex,
    pickupDateTime,
    message,
    etc,
    isCoolerBagSelected,
  } = watchedValues;

  const orderFormCss =
    "w-full p-10 h-auto border border-[#000000]/15 flex flex-col gap-y-6 rounded-2xl";

  const toggleCoolerBag = () => {
    setValue("isCoolerBagSelected", !isCoolerBagSelected);
  };

  const onSubmit = (data: OrderFormValues) => {
    submitOrder(data);
  };

  if (submitError) {
    console.error(submitError);
    alert(`주문 제출 중 오류가 발생했습니다: ${submitError.message}`);
  }

  return (
    <FormProvider {...methods}>
      <div className="w-full flex justify-center mt-8">
        <div className="w-2/3">
          <BackButton />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="min-h-screen pb-10 w-full flex justify-center mt-8">
          <div className=" w-2/3 aspect-square flex flex-col gap-y-8 justify-center">
            {/* 선택한 케이크 디자인 */}
            {cakeImage && (
              <div className={orderFormCss}>
                <h3 className="text-2xl font-bold mb-4">선택하신 디자인</h3>
                <div className="flex items-center justify-center w-full">
                  <img
                    src={cakeImage}
                    alt="선택해서 주문하는 케이크 사진"
                    className="max-w-130 aspect-square object-cover rounded-xl shadow-md"
                  />
                </div>
                {cakeNotice && (
                  <div className="flex items-center text-sm text-red-500 mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <span className="font-semibold">참고 사항:</span>{" "}
                    {cakeNotice}
                  </div>
                )}
              </div>
            )}

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

            {/* 케이크 사이즈 선택 */}
            <div className={orderFormCss}>
              <OrderCakeSizeSelector
                sizes={CUSTOM_CAKE_DATA}
                setValue={setValue}
                selectedSize={selectedSizeIndex}
                error={errors.selectedSizeIndex}
                cakeNotice={cakeNotice}
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
            {/* 주문 요약 */}
            <OrderSummary
              values={watchedValues}
              cakeSizes={CUSTOM_CAKE_DATA}
              flavorOptions={FLAVOR_OPTIONS}
              shapeOptions={SHAPE_OPTIONS}
            />

            {/* 주문버튼 */}
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`
                mt-8 px-6 py-3 w-full bg-blue-500 text-white rounded-xl 
                transition-opacity
                ${
                  !isValid || isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }
              `}
            >
              {isSubmitting ? "주문 처리 중..." : "주문하기"}
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
