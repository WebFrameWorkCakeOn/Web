import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Clock, MapPin, Phone } from "lucide-react";

import storeImg3 from "../assets/storeImg/store3.png";
import BackButton from "../components/BackButton";

const OwnerPage5: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    hours: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("새로운 가게가 성공적으로 등록되었습니다!");
    navigate("/mystore-page");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col text-gray-900">
      <div className="px-20 pt-10">
        <BackButton />
      </div>
      <main className="flex-1 py-8 px-5 flex justify-center">
        <form
          className="bg-white w-full max-w-[700px] rounded-2xl p-8 md:p-10 shadow-sm border border-gray-200"
          onSubmit={handleSubmit}
        >
          <div className="mb-7">
            <label className="block text-[15px] font-semibold text-gray-700 mb-2.5">
              가게 대표 이미지
            </label>
            <div className="w-full h-60 rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-300 relative cursor-pointer group">
              <div className="w-full h-full relative">
                <img
                  src={storeImg3}
                  alt="Store Preview"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
                  <Camera size={24} color="#fff" />
                  <span className="text-white mt-2 text-sm font-medium">
                    이미지 변경
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-7">
            <label className="block text-[15px] font-semibold text-gray-700 mb-2.5">
              가게명 <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="예: 행복한 빵집"
              className="w-full p-3.5 rounded-lg border border-gray-300 text-[15px] text-gray-900 outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black/5"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* 3. 가게 설명 */}
          <div className="mb-7">
            <label className="block text-[15px] font-semibold text-gray-700 mb-2.5">
              가게 설명 <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="description"
              placeholder="가게에 대한 간단한 설명을 입력해주세요"
              className="w-full p-3.5 rounded-lg border border-gray-300 text-[15px] text-gray-900 min-h-[120px] resize-y outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black/5"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* 4. 주소 */}
          <div className="mb-7">
            <label className="block text-[15px] font-semibold text-gray-700 mb-2.5">
              주소
            </label>
            <div className="relative flex items-center">
              <MapPin size={18} className="absolute left-3.5 text-gray-400" />
              <input
                type="text"
                name="address"
                placeholder="예: 서울특별시 강남구 논현동 123-45"
                className="w-full p-3.5 pl-11 rounded-lg border border-gray-300 text-[15px] text-gray-900 outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black/5"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 5. 전화번호 */}
          <div className="mb-7">
            <label className="block text-[15px] font-semibold text-gray-700 mb-2.5">
              전화번호
            </label>
            <div className="relative flex items-center">
              <Phone size={18} className="absolute left-3.5 text-gray-400" />
              <input
                type="text"
                name="phone"
                placeholder="예: 02-1234-5678"
                className="w-full p-3.5 pl-11 rounded-lg border border-gray-300 text-[15px] text-gray-900 outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black/5"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 6. 영업시간 */}
          <div className="mb-7">
            <label className="block text-[15px] font-semibold text-gray-700 mb-2.5">
              영업시간
            </label>
            <div className="relative flex items-center">
              <Clock size={18} className="absolute left-3.5 text-gray-400" />
              <input
                type="text"
                name="hours"
                placeholder="예: 09:00 - 21:00"
                className="w-full p-3.5 pl-11 rounded-lg border border-gray-300 text-[15px] text-gray-900 outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black/5"
                value={formData.hours}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Actions Buttons */}
          <div className="flex gap-4 mt-10">
            <button
              type="submit"
              className="flex-2 py-4 rounded-lg border-none bg-black text-white text-base font-semibold cursor-pointer shadow-[0_4px_6px_-1px_rgba(225,113,0,0.2)] hover:bg-gray-800 transition-colors"
            >
              가게 등록하기
            </button>
            <button
              type="button"
              className="flex-1 py-4 rounded-lg border border-gray-300 bg-white text-gray-700 text-base font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => navigate("/mystore-page")}
            >
              취소
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default OwnerPage5;
