import { Mail, Phone, MapPin, User, Edit } from "lucide-react";
import CAKE_ON from "../assets/icons/CAKE_ON.png";
// import { bgBlack } from "./IntroductionPage";

export const MyPage = () => {
  const inputcss =
    "pl-14 w-90 bg-white/5 border-1 border-black/10 text-black placeholder:text-black/40 h-11 rounded-3xl focus:outline-none focus:ring-0 focus:border-black/50";
  const infocss = "text-xs text-thin text-white/80";
  return (
    <div
      className={`relative w-full min-h-screen pt-30 p-20 flex flex-col border-t border-gray-200 gap-20 items-center`}
    >
      {/* Gradient overlay effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f6339a]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f6339a]/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10 my-8">
        {/* Profile Icon */}

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-[0px_20px_60px_-15px_rgba(236,72,153,0.4)]">
          <div className="flex flex-col items-center pt-5 mb-6">
            <img src={CAKE_ON} className="w-40 h-10" alt="CACEON" />
            <h1 className="text-xl text-black pt-5 font-semibold mb-1">
              마이페이지
            </h1>

            <p className="text-sm text-black/60">
              내 정보를 확인하고 수정하세요.
            </p>
          </div>
          <div className="space-y-4">
            {/* Name Input */}
            <div className="space-y-2">
              <label className={`${infocss}`}>이름</label>
              <div className="relative pt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f6339a]" />
                <input
                  type="text"
                  placeholder="김철수"
                  className={`${inputcss}`}
                />
              </div>
            </div>

            {/* Gender Input */}
            <div className="space-y-2">
              <label className={`${infocss}`}>성별</label>
              <div className="relative pt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f6339a]" />
                <input
                  type="text"
                  placeholder="남자"
                  className={`${inputcss}`}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className={`${infocss}`}>이메일</label>
              <div className="relative pt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f6339a]" />
                <input
                  type="email"
                  placeholder="chulsoo@example.com"
                  className={`${inputcss}`}
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className={`${infocss}`}>전화번호</label>
              <div className="relative pt-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f6339a]" />
                <input
                  type="tel"
                  placeholder="010-1234-5678"
                  className={`${inputcss}`}
                />
              </div>
            </div>

            {/* Address Input */}
            <div className="space-y-2">
              <label className={`${infocss}`}>주소</label>
              <div className="relative pt-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f6339a]" />
                <input
                  type="text"
                  placeholder="서울시 강남구"
                  className={`${inputcss}`}
                />
              </div>
            </div>

            {/* Additional Info Input */}
            <div className="space-y-2">
              <label className={`${infocss}`}>추가 정보</label>
              <div className="relative pt-1">
                <Edit className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f6339a]" />
                <input
                  type="text"
                  placeholder="추가 정보"
                  className={`${inputcss}`}
                />
              </div>
            </div>

            {/* Update Button */}
            <button className="w-full h-11 bg-black hover:opacity-70 text-white font-medium rounded-3xl shadow-lg shadow-[#f6339a]/25 transition-all mt-6 flex items-center justify-center gap-2">
              <Edit className="w-4 h-4" />
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
