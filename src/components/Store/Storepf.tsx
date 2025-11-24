import cake1 from "../../assets/icons/young1.png"
import cake2 from "../../assets/icons/young2.png"
import cake3 from "../../assets/icons/young3.png"
import cake4 from "../../assets/icons/young4.png"
import cake5 from "../../assets/icons/young5.png"
import cake6 from "../../assets/icons/young6.png"
import cake7 from "../../assets/icons/young7.png"
import cake8 from "../../assets/icons/young8.png"
import cake9 from "../../assets/icons/young9.png"
import cake10 from "../../assets/icons/young10.png"
import cake11 from "../../assets/icons/young11.png"
import cake12 from "../../assets/icons/young12.png"
import {CircleAlert} from "lucide-react"

const cakes = [
  { img: cake1, notice: "1호 케이크 이상부터 가능해요" },
  { img: cake2, notice: "" },
  { img: cake3, notice: "" },
  { img: cake4, notice: "" },
  { img: cake5, notice: "1호 케이크 이상부터 가능해요" },
  { img: cake6, notice: "" },
  { img: cake7, notice: "1호 케이크 이상부터 가능해요" },
  { img: cake8, notice: "" },
  { img: cake9, notice: "" },
  { img: cake10, notice: "" },
  { img: cake11, notice: "" },
  { img: cake12, notice: "" },
];
const Storefp = () =>{
    return(
        <div className="mt-10 p-10 border-t border-gray-200 flex flex-col pt-4">
            <h3 className="font-semibold mb-2">케이크 포트폴리오</h3>
            <p className="text-xs text-gray-500 mb-4">
                주문 가능한 케이크 도안을 확인하세요
            </p>
            {/* 추가 이미지나 설명 컴포넌트 배치 */}
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cakes.map((cake, i) => (
          <div key={i} className="flex flex-col items-center w-full aspect-square border-1 border-gray-100 rounded-lg shadow-sm bg-white pb-4">
            <img src={cake.img} alt="" className="object-cover w-full h-70 rounded-t-lg justify-center items-center" />
            <div className="w-11/12 mt-3 flex flex-col items-center gap-1">
              <button className="w-full bg-black text-white text-sm rounded py-1.5 transition hover:bg-black/80">
                주문하기
              </button>
              {cake.notice && (
                <div className="flex flex-row w-full text-xs mt-1 text-red-400 bg-red-50 border-1 border-red-200/80 px-2 py-1 text-center rounded">
                              <CircleAlert className="ml-15 mr-1 w-4 h-4" />{cake.notice}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
        </div>
    );
};
export default Storefp