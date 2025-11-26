import type { OrderAddsOptionsProps } from "../../type/order";

export function OrderAddsOptions({
  registerCandleCount,
  isCoolerBagSelected,
  toggleCoolerBag,
}: OrderAddsOptionsProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-xl font-bold">기본 초 갯수</div>
      <div className="flex items-center gap-x-4">
        <div className="font-bold text-lg">초 갯수</div>
        <input
          type="text"
          {...registerCandleCount}
          className="bg-[#F3F3F5] h-12 w-24 rounded-xl text-center"
        />
        <div className="text-lg">개</div>
      </div>
      <div className="text-xl mt-6 font-bold">보냉백 구입</div>
      <div
        className={`w-full border-2 rounded-xl p-5 cursor-pointer ${
          isCoolerBagSelected
            ? "border-blue-500 bg-blue-50"
            : "border-[#000000]/10"
        }`}
        onClick={toggleCoolerBag}
      >
        <div className="flex justify-between items-center px-5">
          <div className="text-lg">보냉백 구입</div>
          <div className="px-3 rounded-2xl border border-[#000000]/20 text-lg">
            5000원
          </div>
        </div>
      </div>
    </div>
  );
}
