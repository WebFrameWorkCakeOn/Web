import { useNavigate } from "react-router-dom";
import cakeImg from "../assets/cakeImg/IMG_5978.jpg";
import BackButton from "../components/BackButton";

const AddMenuPage = () => {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/manage-items");
    alert("메뉴추가");
  };
  const handleCancel = () => {
    navigate("/manage-items");
    alert("취소");
  };
  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-4 sm:px-6 lg:px-8">
      <div className="px-20">
        <BackButton />
      </div>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-[#101828]">새 메뉴 등록</h2>
            <p className="mt-1 text-sm text-[#4a5565]">
              새로운 메뉴 정보를 입력해주세요
            </p>
          </div>

          <div className="p-8 space-y-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#364153]">
                메뉴명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue="치즈케이크"
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e17100]/20 focus:border-[#e17100] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#364153]">
                설명
              </label>
              <textarea
                rows={3}
                defaultValue="부드럽고 진한 크림치즈 케이크"
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e17100]/20 focus:border-[#e17100] resize-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#364153]">
                  가격 (원) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="6000"
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 text-[#0a0a0a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e17100]/20 focus:border-[#e17100] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#364153]">
                이미지
              </label>

              <div className="mt-2">
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={cakeImg}
                    alt="메뉴 미리보기"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                    <p className="text-xs text-white truncate px-2">
                      ../components/cake1.jpg
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                className="flex-1 bg-[#111111] text-white h-[52px] rounded-lg font-bold text-base hover:bg-black transition-colors shadow-md
              "
                onClick={handleAdd}
              >
                메뉴 추가
              </button>

              <button
                className="flex-1 bg-white text-[#0a0a0a] h-[52px] rounded-lg font-bold text-base border border-gray-300 hover:bg-gray-50 transition-colors"
                onClick={handleCancel}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenuPage;
