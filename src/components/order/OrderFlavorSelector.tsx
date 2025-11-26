import type { OrderFlavorSelectorProps } from "../../type/order";

export function OrderFlavorSelector({
  flavors,
  registerFlavor,
  selectedFlavor,
  error,
}: OrderFlavorSelectorProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-xl font-bold">시트 맛</div>
      <div className="flex flex-col w-full gap-y-4">
        {flavors.map((flavor, idx) => {
          const isSelected = selectedFlavor === idx.toString();
          return (
            <label
              key={idx}
              className={`w-full border-2 rounded-xl h-20 px-10 flex items-center justify-between cursor-pointer
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-[#000000]/10"
                }`}
            >
              <input
                type="radio"
                value={idx.toString()}
                {...registerFlavor}
                className="hidden"
              />
              <div className="font-bold">{flavor.name}</div>
              <div className="border-2 w-20 h-8 flex items-center justify-center border-[#000000]/20 rounded-2xl">
                + {flavor.price}
              </div>
            </label>
          );
        })}
      </div>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}
