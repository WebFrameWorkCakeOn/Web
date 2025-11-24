import { Upload } from "lucide-react";
import { useState } from "react";

const CUSTOM_CAKE_DATA = [
  {
    sizeName: "도시락 케이크",
    diameterText: "9cm ~ 12cm 내외",
    peopleText: "1~2명",
    priceAverage: 27500,
  },
  {
    sizeName: "1호",
    diameterText: "15cm 내외",
    peopleText: "2~3명",
    priceAverage: 50000,
  },
  {
    sizeName: "2호",
    diameterText: "18cm 내외",
    peopleText: "4~6명",
    priceAverage: 75000,
  },
  {
    sizeName: "3호",
    diameterText: "21cm 내외",
    peopleText: "7~10명",
    priceAverage: 105000,
  },
  {
    sizeName: "4호",
    diameterText: "24cm 내외",
    peopleText: "10~15명",
    priceAverage: 120000,
  },
];
const FLAVOR_OPTIONS = [
  { name: "바닐라", price: 0 },
  { name: "초코", price: 5000 },
];
const SHAPE_OPTIONS = [
  { name: "원형", price: 0 },
  { name: "하트", price: 5000 },
];

const OrderPage = () => {
  const [fileName, setFileName] = useState("선택된 파일이 없습니다");
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number | null>(
    null
  );
  const [selectedFlavorIndex, setSelectedFlavorIndex] = useState<number | null>(
    null
  );
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(
    null
  );
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("선택된 파일이 없습니다");
    }
  };

  const handleSizeSelect = (index: number) => {
    setSelectedSizeIndex(index);
  };
  const orderFormCss =
    "w-full p-10 h-auto border border-[#000000]/15 flex flex-col gap-y-6 rounded-2xl";

  return (
    <div className="min-h-screen pb-10 w-full flex justify-center ">
      <div className="h-full w-2/3 flex flex-col gap-y-8 justify-center">
        {/*수량*/}
        <div className={orderFormCss}>
          <div className="text-xl">케이크 주문수</div>
          <div className="flex items-center w-full h-9 gap-x-4">
            <div className="text-lg font-bold">수량</div>
            <input
              type="text"
              className="bg-[#F3F3F5] h-full w-24 gap-x-2 rounded-xl text-center"
            />
            <div className="text-lg ">개</div>
          </div>
        </div>
        {/*픽업 날짜... 캘린더ㅜ */}
        {/*주문자 성함, 번호*/}
        <div className={orderFormCss}>
          <div className="text-xl">케이크 주문수</div>
          <div className="flex flex-col gap-y-2 w-full h-auto">
            <div className="text-lg font-bold">성함</div>
            <input
              type="text"
              className="bg-[#F3F3F5] h-11 w-full gap-x-2 rounded-xl px-5"
              placeholder="성함을 입력해주세요"
            />
          </div>
          <div className="flex flex-col gap-y-2 w-full h-auto">
            <div className="text-lg font-bold">전화번호</div>
            <input
              type="text"
              className="bg-[#F3F3F5] h-11 w-full gap-x-2 rounded-xl px-5"
              placeholder="010-0000-0000"
            />
          </div>
        </div>
        {/*디자인 첨부*/}
        <div className={orderFormCss}>
          <div className="text-xl">디자인</div>
          <div className="flex flex-col gap-y-2 w-full h-auto">
            <div className="text-lg font-bold">케이크 사진, 스케치 첨부</div>
            <div className="w-full aspect-5/1 border border-[#000000]/10 rounded-2xl flex flex-col justify-center items-center gap-y-2">
              <Upload stroke="#717182" strokeWidth={2} width={60} height={60} />
              <div className="text-[#717182] text-lg">
                원하는 디자인 이미지를 올려주세요
              </div>
              <label className="inline-block w-26 h-12 border-2 border-[#000000]/10 text-center leading-12 cursor-pointer rounded-xl justify-center items-center">
                파일선택
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <div className="mt-2 text-sm text-gray-600">{fileName}</div>
            </div>
          </div>
        </div>
        {/*사이즈 선택*/}
        <div className={orderFormCss}>
          <div className="text-xl">사이즈</div>
          <div className="flex flex-col w-full h-auto gap-y-4">
            {CUSTOM_CAKE_DATA.map((cake, index) => (
              <div
                key={index}
                className={`w-full border-2 rounded-xl h-20 px-10 flex items-center justify-between cursor-pointer
              ${
                selectedSizeIndex === index
                  ? "border-blue-500 bg-blue-50"
                  : "border-[#000000]/10"
              }`}
                onClick={() => handleSizeSelect(index)}
              >
                <div className="flex flex-col">
                  <div className="font-bold">
                    {cake.sizeName} ({cake.peopleText})
                  </div>

                  <div className="text-sm text-[#717182] ">
                    지름 {cake.diameterText}
                  </div>
                </div>

                <div className="px-3 rounded-2xl border  border-[#000000]/20  text-lg">
                  {cake.priceAverage}원
                </div>
              </div>
            ))}
          </div>
        </div>
        {/*맛 선택*/}
        <div className={orderFormCss}>
          <div className="text-xl">시트 맛</div>
          <div className="flex flex-col w-full gap-y-4">
            {FLAVOR_OPTIONS.map((flavor, index) => (
              <div
                key={index}
                className={`w-full border-2 rounded-xl h-20 px-10 flex items-center justify-between cursor-pointer
                ${
                  selectedFlavorIndex === index
                    ? "border-blue-500 bg-blue-50"
                    : "border-[#000000]/10"
                }`}
                onClick={() => setSelectedFlavorIndex(index)}
              >
                <div className="font-bold">{flavor.name}</div>
                <div className="border-2 w-20 h-8 flex items-center justify-center border-[#000000]/20 rounded-2xl ">
                  + {flavor.price}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/*모양*/}
        <div className={orderFormCss}>
          <div className="text-xl">케이크 모양</div>
          <div className="flex flex-col w-full gap-y-4">
            {SHAPE_OPTIONS.map((shape, index) => (
              <div
                key={index}
                className={`w-full border-2 rounded-xl h-20 px-10 flex items-center justify-between cursor-pointer
                ${
                  selectedShapeIndex === index
                    ? "border-blue-500 bg-blue-50"
                    : "border-[#000000]/10"
                }`}
                onClick={() => setSelectedShapeIndex(index)}
              >
                <div className="font-bold">{shape.name}</div>
                <div className="border-2 w-20 h-8 flex items-center justify-center border-[#000000]/20 rounded-2xl ">
                  + {shape.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
