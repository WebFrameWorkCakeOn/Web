import type {
  OrderFormValues,
  CakeSize,
  FlavorOption,
  ShapeOption,
} from "../../type/order";

export function OrderSummary({
  values,
  cakeSizes,
  flavorOptions,
  shapeOptions,
}: {
  values: OrderFormValues;
  cakeSizes: CakeSize[];
  flavorOptions: FlavorOption[];
  shapeOptions: ShapeOption[];
}) {
  //선택 여부에 따른 전체 가격 계산
  const sizePrice =
    typeof values.selectedSizeIndex === "string" &&
    values.selectedSizeIndex !== null
      ? cakeSizes[Number(values.selectedSizeIndex)].priceAverage
      : 0;

  const flavorPrice =
    typeof values.selectedFlavorIndex === "string" &&
    values.selectedFlavorIndex !== null
      ? flavorOptions[Number(values.selectedFlavorIndex)].price
      : 0;

  const shapePrice =
    typeof values.selectedShapeIndex === "number"
      ? shapeOptions[values.selectedShapeIndex].price
      : 0;

  const coolerBagPrice = values.isCoolerBagSelected ? 5000 : 0;
  const totalPrice = sizePrice + flavorPrice + shapePrice + coolerBagPrice;

  // 금액: number->string + 돈 단위로 포맷
  const formatPrice = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="p-8 border rounded-xl bg-[#030213]/5 my-6">
      <h2 className="text-xl font-bold mb-8">주문 요약</h2>
      <ul className="flex flex-col gap-3">
        <li className="flex items-center justify-between">
          <div>이름:</div> {values.userName}
        </li>
        <li className="flex items-center justify-between">
          <div>전화번호:</div> {values.userPhone}
        </li>
        <li className="flex items-center justify-between">
          <div>픽업 날짜 & 시간:</div>{" "}
          {values.pickupDateTime ? values.pickupDateTime.toLocaleString() : ""}
        </li>
        <li className="flex items-center justify-between">
          <div>케이크 사이즈:</div>{" "}
          {typeof values.selectedSizeIndex === "string" &&
          values.selectedSizeIndex !== null
            ? cakeSizes[Number(values.selectedSizeIndex)].sizeName
            : ""}
        </li>
        <li className="flex items-center justify-between">
          <div>케이크 맛:</div>{" "}
          {typeof values.selectedFlavorIndex === "string" &&
          values.selectedFlavorIndex !== null
            ? flavorOptions[Number(values.selectedFlavorIndex)].name
            : ""}
        </li>
        <li className="flex items-center justify-between">
          <div>모양:</div>{" "}
          {typeof values.selectedShapeIndex === "number"
            ? shapeOptions[values.selectedShapeIndex].name
            : ""}
        </li>
        <li className="flex items-center justify-between">
          <div>문구:</div> {values.message}
        </li>
        <li>
          <div>기타 요청:</div> {values.etc}
        </li>
        <li className="flex items-center justify-between">
          <div>보냉백:</div>{" "}
          {values.isCoolerBagSelected ? "구매함" : "구매안함"}
        </li>
        <li className="flex items-center justify-between">
          <div>초 갯수:</div> {values.candleCount}
        </li>
        <li className="flex items-center justify-between">
          <div>디자인 파일명:</div> {values.fileName}
        </li>
        <li className="flex items-center justify-between">
          <div>동의여부:</div> {values.agreed ? "동의함" : "동의 안함"}
        </li>
        <li className="flex items-center justify-between h-5 border-t border-[#000000]/15 pt-5">
          <div className="font-bold">총 금액:</div> {formatPrice(totalPrice)}원
        </li>
      </ul>
    </div>
  );
}
