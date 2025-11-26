import type { OrderNoticesProps } from "../../type/order";

export function OrderNotices({ registerAgree, error }: OrderNoticesProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-xl">필독 사항</div>
      <ul className="list-disc flex flex-col gap-y-2 bg-[#ECECF0] px-8 py-5 rounded-2xl">
        <li>케이크는 반드시 선택하신 픽업 날짜와 시간에 맞춰 수령해주세요.</li>
        <li>무인 픽업 시스템으로 운영되며, 예약 시간에 맞춰 준비됩니다.</li>
        <li>당일 취소 및 환불은 불가능합니다.</li>
        <li>알레르기가 있는 경우 반드시 사전에 알려주세요.</li>
        <li>디자인은 참고 이미지를 바탕으로 최대한 유사하게 제작됩니다.</li>
      </ul>
      <div className="flex items-center gap-x-3 mt-4">
        <input
          type="checkbox"
          className="w-5 h-5 cursor-pointer"
          {...registerAgree}
        />
        <label className="cursor-pointer font-bold text-base">
          위 필독사항을 확인했으며, 무인시스템 운영에 동의합니다.
        </label>
      </div>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}
