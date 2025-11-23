import { MapPin, Star } from "lucide-react";
import type { PopulaarStoreProps } from "../../type/store";
import { Link } from "react-router-dom";

const PopularStoreCard = ({
  name,
  rating,
  location,
  description,
  src,
}: PopulaarStoreProps) => {
  return (
    <div className="w-full aspect-square border border-black/20 rounded-2xl">
      <img
        src={src}
        alt={name}
        className="w-full h-2/3 object-cover rounded-md mb-4"
      />
      <div className="w-full h-auto flex flex-col gap-y-3 px-4">
        <div className="flex flex-col gap-y-0.5 h-auto ">
          <div className="flex w-full justify-between items-center">
            <div className="text-xl">{name}</div>
            <div className="flex gap-x-2">
              <Star stroke="#FDC700" fill="#FDC700" strokeWidth={2} />
              {rating}
            </div>
          </div>
          <div className="text-lg text-[#717182]">{description}</div>
          <div className="flex gap-x-2 text-[#717182]">
            <MapPin stroke="#717182" strokeWidth={2} />
            {location}
          </div>
        </div>
        <Link
          to="/"
          className="w-1/4 h-10 rounded-2xl bg-black text-white text-xl flex items-center justify-center"
        >
          픽업하기
        </Link>
      </div>
    </div>
  );
};

export default PopularStoreCard;
