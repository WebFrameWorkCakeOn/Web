import type { OrderUserInfoFormProps } from "../../type/order";

export function OrderUserInfoForm({
  register,
  errorUserName,
  errorUserPhone,
}: OrderUserInfoFormProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-xl">주문자 정보</div>
      <div className="flex flex-col gap-y-2">
        <div className="font-bold text-lg">성함</div>
        <input
          type="text"
          {...register("userName", { required: true })}
          placeholder="성함을 입력해주세요"
          className="bg-[#F3F3F5] h-11 w-full rounded-xl px-5"
        />
        {errorUserName && (
          <span className="text-red-500">{errorUserName.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="font-bold text-lg">전화번호</div>
        <input
          type="text"
          {...register("userPhone", { required: true })}
          placeholder="010-0000-0000"
          className="bg-[#F3F3F5] h-11 w-full rounded-xl px-5"
        />
        {errorUserPhone && (
          <span className="text-red-500">{errorUserPhone.message}</span>
        )}
      </div>
    </div>
  );
}
