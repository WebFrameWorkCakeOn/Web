import { CircleAlert } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import type { Cake } from "../../type/store";

interface StorefpProps {
  cakes: Cake[];
}

const Storefp: React.FC<StorefpProps> = ({ cakes }) => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="mt-10 p-10 border-t border-gray-200 flex flex-col pt-4">
      <h3>케이크 포트폴리오 ({cakes.length}개)</h3>
      <p className="text-xs text-gray-500 mb-4">
        주문 가능한 케이크 도안을 확인하세요
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cakes.map((cake, i) => (
          <div
            key={i}
            className="flex flex-col items-center w-full min-h-50 border border-gray-100 rounded-lg shadow-sm bg-white pb-4"
          >
            <img
              src={cake.imageUrl}
              alt=""
              className="object-cover w-full max-h-120 rounded-t-lg justify-center items-center"
            />
            <div className="w-11/12 mt-3 flex flex-col items-center gap-1">
              <Link
                to={`/order-detail/${id}`}
                state={{ cakeImage: cake.imageUrl, cakeNotice: cake.notice }}
                className="w-full h-8 bg-black text-white text-sm rounded py-1.5 transition hover:bg-black/80 flex items-center justify-center"
              >
                주문하기
              </Link>
              {cake.notice && (
                <div className="flex flex-row w-full h-8 text-xs mt-1 text-red-400 bg-red-50 border border-red-200/80 px-2 py-1 rounded items-center justify-center">
                  <CircleAlert className="ml-15 mr-1 w-4 h-4" />
                  {cake.notice}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Storefp;
