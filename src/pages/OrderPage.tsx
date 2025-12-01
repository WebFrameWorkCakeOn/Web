import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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
import { OrderDesignUpload } from "../components/order/OrderDesignUpload";
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

export default function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const storeIdNumber = id ? parseInt(id, 10) : 0;
  const navigate = useNavigate();

  const { user, isLoading: authLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      storeid: storeIdNumber,
      userName: user?.name || "",
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

  const handleOrderComplete = () => {
    navigate("/", { state: { message: "주문 성공!" } });
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    handleOrderComplete();
  };
  const {
    submitOrder,
    isSubmitting,
    error: submitError,
  } = useOrderSubmission(openModal);

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
