import storeimage from "../../assets/icons/storeimage.png";

const Storeimage = () => {
  return (
    <div className="relative flex-1">
      <img
        src={storeimage} // 실제 경로로 변경
        alt="달콤한 베이커리 내부"
        className="rounded-lg object-cover w-full h-80"
      />
      <div className="absolute top-4 left-4 inline-block px-3 py-1 bg-[#00C950] text-white text-xs font-base rounded-xl w-fit">
        영업중
      </div>
      <div className="absolute top-4 left-22 inline-block px-3 py-1 bg-[#2B7FFF] text-white text-xs font-base rounded-xl w-fit">
        당일예약가능
      </div>
    </div>
  );
};

export default Storeimage;
