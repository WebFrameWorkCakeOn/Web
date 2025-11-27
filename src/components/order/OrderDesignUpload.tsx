import { Upload } from "lucide-react";
import type { OrderDesignUploadProps } from "../../type/order";

export function OrderDesignUpload({
  setValue,
  fileName,
}: OrderDesignUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setValue("fileName", files[0].name); // 파일명만 저장
      setValue("file", files[0]); // 파일 객체 저장
    } else {
      setValue("fileName", "선택된 파일이 없습니다");
      setValue("file", null);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-xl">디자인</div>
      <div className="font-bold text-lg">케이크 사진, 스케치 첨부</div>
      <div className="w-full aspect-4/1 border rounded-2xl flex flex-col justify-center items-center gap-y-3">
        <Upload stroke="#717182" strokeWidth={2} width={60} height={60} />
        <div className="text-[#717182] text-lg">
          원하는 디자인 이미지를 올려주세요
        </div>
        <label className="inline-block w-26 h-12 border-2 text-center leading-12 cursor-pointer rounded-xl">
          파일선택
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
        <div className="mt-2 text-sm text-gray-600">{fileName}</div>
      </div>
    </div>
  );
}
