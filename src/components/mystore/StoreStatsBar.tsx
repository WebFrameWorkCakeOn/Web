import { Box, Cake, Check } from "lucide-react";
import React from "react";

interface StoreStats {
  totalOrders: number;
  preparing: number;
  completed: number;
}

export const StoreStatsBar: React.FC<{ stats: StoreStats }> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* 총 주문 */}
    <div className="bg-white rounded-xl p-5 flex items-center shadow-sm border border-gray-200">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-4 bg-amber-100">
        <Box className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm text-gray-500 mb-1">총 주문</div>
        <div className="text-xl font-bold text-gray-900">
          {stats.totalOrders}건
        </div>
      </div>
    </div>

    {/* 제조중 */}
    <div className="bg-white rounded-xl p-5 flex items-center shadow-sm border border-gray-200">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-4 bg-blue-100">
        <Cake className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm text-gray-500 mb-1">제조중</div>
        <div className="text-xl font-bold text-gray-900">
          {stats.preparing}건
        </div>
      </div>
    </div>

    {/* 완료 */}
    <div className="bg-white rounded-xl p-5 flex items-center shadow-sm border border-gray-200">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-4 bg-green-100">
        <Check className="h-5 w-5" />
      </div>
      <div>
        <div className="text-sm text-gray-500 mb-1">완료</div>
        <div className="text-xl font-bold text-gray-900">
          {stats.completed}건
        </div>
      </div>
    </div>
  </div>
);
