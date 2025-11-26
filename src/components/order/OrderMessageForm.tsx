import type { OrderMessageFormProps } from "../../type/order";

export function OrderMessageForm({
  registerMessage,
  message,
  error,
}: OrderMessageFormProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-xl font-bold">문구</div>
      <input
        type="text"
        {...registerMessage}
        value={message}
        className="bg-[#F3F3F5] h-11 w-full rounded-xl px-5"
        placeholder="예: 생일축하해요"
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}
