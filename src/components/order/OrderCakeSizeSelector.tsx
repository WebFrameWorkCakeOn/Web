import type { OrderCakeSizeSelectorProps } from "../../type/order";

export function OrderCakeSizeSelector({
  sizes,

  selectedSize,
  error,
  setValue,
  cakeNotice,
}: OrderCakeSizeSelectorProps) {
  const isNoticeActive = !!cakeNotice;
  const handleChange = (idx: number, sizeName: string) => {
    // ⭐️ 비활성화된 옵션은 선택하지 못하도록 가드 로직 추가
    if (isNoticeActive && idx === 0) {
      return;
    }

    setValue("selectedSizeIndex", idx.toString(), { shouldValidate: true });
    setValue("cakeSize", sizeName, { shouldValidate: true });
  };
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-xl font-bold">사이즈</div>
      <div className="flex flex-col w-full gap-y-4">
        {sizes.map((cake, idx) => {
          const isSelected = String(selectedSize) === String(idx);
          const isDisabled = isNoticeActive && idx === 0;
          return (
            <label
              key={idx}
              className={`w-full border-2 rounded-xl h-20 px-10 flex items-center justify-between
                ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed bg-gray-50"
                    : "cursor-pointer"
                }
                ${
                  isSelected && !isDisabled
                    ? "border-blue-500 bg-blue-50"
                    : "border-[#000000]/10"
                }`}
              onClick={() => {
                if (!isDisabled) {
                  handleChange(idx, cake.sizeName);
                }
              }}
            >
              <input
                type="radio"
                name="selectedSizeIndex"
                value={idx.toString()}
                checked={isSelected}
                onChange={() => handleChange(idx, cake.sizeName)}
                className="hidden"
                disabled={isDisabled}
              />
              <div>
                <div className="font-bold">
                  {cake.sizeName} ({cake.peopleText})
                </div>
                <div className="text-sm text-[#717182]">
                  지름 {cake.diameterText}
                </div>
              </div>
              <div className="px-3 rounded-2xl border border-[#000000]/20 text-lg">
                {cake.priceAverage}원
              </div>
            </label>
          );
        })}
      </div>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}
