import React from "react";
import gpss from "../../assets/icons/gpss.png";
import call from "../../assets/icons/call.png";
import watch from "../../assets/icons/watch.png";
import mcal from "../../assets/icons/mcal.png";
import { Link } from "react-router-dom";
import type { Store } from "../../type/store";
import { Star } from "lucide-react";

const Storeinfo: React.FC<Store> = ({
  name,
  rating,
  location,
  shortDescription,
  fullDescription,
  phoneNumber,
  openingHours,
  pickupNote,
  pickupLinkText,
  storeid,
}) => {
  const textcss2 = "text-xs text-black/40 text-bold";

  return (
    <div className="flex-1 space-y-2">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">{name}</h2>
        <div className="text-yellow-500 font-semibold flex gap-x-2">
          <Star stroke="#FDC700" fill="#FDC700" strokeWidth={2} /> {rating}
        </div>
      </div>

      {shortDescription && (
        <div className="text-sm text-gray-500 mb-2">{shortDescription}</div>
      )}

      {fullDescription && (
        <div className="text-gray-600 mt-5 text-xs mb-4">{fullDescription}</div>
      )}

      <div className="text-sm border-t border-gray-200">
        <div className="mt-3">
          <ul className="flex flex-col gap-3 p-0">
            <li className="flex flex-row">
              <div>
                <img src={gpss} alt="주소 아이콘" />
              </div>
              <div className="flex flex-col pl-2">
                <p className={`${textcss2}`}>주소</p>
                <p>{location}</p>
              </div>
            </li>

            <li className="flex flex-row">
              <div>
                <img src={call} alt="전화 아이콘" />
              </div>
              <div className="flex flex-col pl-2">
                <p className={`${textcss2}`}>전화번호</p>
                <p>{phoneNumber}</p>
              </div>
            </li>

            <li className="flex flex-row">
              <div>
                <img src={watch} alt="시계 아이콘" />
              </div>
              <div className="flex flex-col pl-2">
                <p className={`${textcss2}`}>영업시간</p>
                <p>{openingHours}</p>
              </div>
            </li>

            <li className="flex flex-row border-b border-gray-200">
              <div>
                <img src={mcal} alt="달력 아이콘" />
              </div>
              <div className="flex flex-col pl-2">
                <p className={`${textcss2}`}>픽업안내</p>
                <p>{pickupNote}</p>
                <p className="underline text-xs text-blue-500 mb-5">
                  {pickupLinkText}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <Link
        className="mt-4 flex-1 w-full bg-black text-white py-3 rounded hover:bg-black/80 text-center block"
        to={`/order/${storeid}`}
      >
        픽업 주문하기
      </Link>
    </div>
  );
};

export default Storeinfo;
