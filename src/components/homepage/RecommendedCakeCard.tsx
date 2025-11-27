import { Star } from "lucide-react";
import type { RecommendedCakeProps } from "../../type/cake";
import { Link } from "react-router-dom";
import { hoverEffect } from "../Navbar";

const RecommendedCakeCard = ({
  name,
  store,
  rating,
  price,
  src,
}: RecommendedCakeProps) => {
  return (
    <div className="w-1/4 aspect-4/5  border border-black/10 rounded-2xl ">
      <img
        src={src}
        alt={name}
        className="w-full h-2/3 object-cover rounded-md mb-2"
      />
      <div className="flex flex-col gap-y-0.5 px-4">
        <div className="text-xl">{name}</div>
        <div className="text-lg text-[#717182]">{store}</div>

        <div className="flex gap-x-2">
          <Star stroke="#FDC700" fill="#FDC700" strokeWidth={2} />
          {rating}
        </div>
        <div className="w-full h-auto flex justify-between items-center">
          <div className="text-gray-800 text-lg font-bold">
            {price.toLocaleString()}원
          </div>
          <Link
            to="order-detail"
            state={{ cakeImage: src }}
            className={`w-1/3 h-10 rounded-2xl bg-black text-white text-xl flex items-center justify-center ${hoverEffect}`}
          >
            주문하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCakeCard;
