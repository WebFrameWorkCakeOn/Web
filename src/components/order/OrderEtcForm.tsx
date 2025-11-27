import type { OrderEtcFormProps } from "../../type/order";

export function OrderEtcForm({ registerEtc, etc, error }: OrderEtcFormProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-xl font-bold">기타</div>
      <div className="font-bold text-lg">배경색, 데코모양, 문구색상 등</div>
      <input
        type="text"
        {...registerEtc}
        value={etc}
        className="bg-[#F3F3F5] h-25 w-full rounded-xl px-5"
        placeholder="예: 핑크색 배경, 꽃 데코레이션, 골드 문구"
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}
