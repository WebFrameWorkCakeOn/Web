import type { OrderShapeSelectorProps } from "../../type/order";

export function OrderShapeSelector({
  shapes,
  selectedShape,
  setValue,
  error,
}: OrderShapeSelectorProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-xl">케이크 모양</div>
      <div className="flex flex-col w-full gap-y-4">
        {shapes.map((shape, idx) => (
          <div
            key={idx}
            onClick={() => setValue("selectedShapeIndex", idx)}
            className={`w-full border-2 rounded-xl h-20 px-10 flex items-center justify-between cursor-pointer
            ${
              selectedShape === idx
                ? "border-blue-500 bg-blue-50"
                : "border-[#000000]/10"
            }`}
          >
            <div className="font-bold">{shape.name}</div>
            <div className="border-2 w-20 h-8 flex items-center justify-center border-[#000000]/20 rounded-2xl">
              + {shape.price}
            </div>
          </div>
        ))}
      </div>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}
