import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { OrderPickupDateTimeProps } from "../../type/order";

export function OrderPickupDateTime({
  control,
  setValue,
  value,
  error,
}: OrderPickupDateTimeProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-xl">픽업 날짜 & 시간</div>
      <Controller
        control={control}
        name="pickupDateTime"
        render={() => (
          <DatePicker
            selected={value}
            onChange={(date) => setValue("pickupDateTime", date)}
            showTimeSelect
            timeIntervals={30}
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={new Date()}
            placeholderText="픽업 날짜와 시간을 선택해주세요"
            className="w-full rounded-xl border p-3 bg-gray-100 text-lg"
          />
        )}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}
