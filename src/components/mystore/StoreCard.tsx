import { Cog, Star } from "lucide-react";

interface StoreProps {
  id: number;
  name: string;
  description: string;
  rating: number;
  totalOrders: number;
  preparing: number;
  image: string;
  onManageClick: (storeId: number) => void;
}

const StoreCard = ({
  id,
  name,
  description,
  rating,
  totalOrders,
  preparing,
  image,
  onManageClick,
}: StoreProps) => {
  return (
    <div
      key={id}
      className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col h-[420px]"
    >
      <div
        className="h-48 w-full bg-gray-200 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2 mt-0">
              {name}
            </h3>
            <p className="text-sm text-gray-600 m-0 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">평점</span>
              <div className="font-semibold flex gap-1">
                <Star stroke="yellow" fill="yellow" className="h-5 w-5" />{" "}
                {rating}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">총 주문</span>
              <span className="font-semibold text-gray-900">
                {totalOrders}건
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-blue-50 text-blue-600 py-2 px-3 rounded-md text-sm font-semibold mb-auto flex items-center w-fit">
            <span className="flex items-center">제조중 {preparing}건</span>
          </div>

          <button
            className="w-full bg-gray-900 text-white border-none py-3.5 rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center gap-1 mt-5 transition duration-200 hover:bg-gray-700"
            onClick={() => onManageClick(id)}
          >
            <Cog className="h-6 w-6" />
            가게 관리하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
