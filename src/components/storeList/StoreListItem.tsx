import { MapPin, Star } from "lucide-react";
import type { PopularStoreProps } from "../../type/store";
import { Link } from "react-router-dom";
import { hoverEffect } from "../Navbar";

const StoreListItem = ({
  name,
  rating,
  location,
  description,
  imageUrl,
  storeid,
}: PopularStoreProps) => {
  return (
    <div className="w-full h-40 flex border border-black/20 rounded-2xl overflow-hidden shadow-sm bg-white">
      <div className="w-1/3 h-full overflow-hidden">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="w-2/3 h-full flex flex-col justify-between p-4">
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
              {name}
            </h3>
            <div className="flex items-center gap-x-1 text-gray-700 text-sm">
              <Star
                stroke="#FDC700"
                fill="#FDC700"
                strokeWidth={1.5}
                className="h-4 w-4"
              />{" "}
              {/* 아이콘 크기 조정 */}
              <span>{rating}</span>
            </div>
          </div>
          <p className="text-sm text-[#717182] line-clamp-1">{description}</p>{" "}
          <div className="flex items-center gap-x-1 text-xs text-[#717182]">
            <MapPin
              stroke="#717182"
              strokeWidth={1.5}
              className="h-3.5 w-3.5"
            />{" "}
            <span>{location}</span>
          </div>
        </div>

        <Link
          to={`/store-page/${storeid}`}
          className={`self-end px-4 py-2 bg-black text-white text-sm font-medium rounded-lg flex items-center justify-center ${hoverEffect} whitespace-nowrap`}
        >
          픽업하기
        </Link>
      </div>
    </div>
  );
};

export default StoreListItem;
