import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import cakeImg1 from "../assets/cakeImg/IMG_5978.jpg";
import cakeImg2 from "../assets/cakeImg/IMG_5979.jpg";
import cakeImg3 from "../assets/cakeImg/IMG_5982.jpg";
import MenuItemCard from "../components/mystore/MenuItemCard";
import type { MenuItem } from "../type/mystore";

const ManageItemPage: React.FC = () => {
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "딸기케이크",
      category: "커스텀",
      description: " 달콥한 딸기를 가득 품은 케이크",
      price: 48000,
      image: cakeImg1,
    },
    {
      id: 2,
      name: "치즈케이크",
      category: "디저트",
      description: "부드럽고 진한 크림치즈 케이크",
      price: 56000,
      image: cakeImg2,
    },
    {
      id: 3,
      name: "커스텀 쿠키 케이크",
      category: "베이커리",
      description: "촉촉하고 달콤한 프랑스 전통 빵",
      price: 32000,
      image: cakeImg3,
    },
  ];

  const handleEdit = (id: number) => {
    console.log(`${id}번 메뉴 수정 버튼 클릭됨`);
  };

  const handleDelete = (id: number) => {
    console.log(`${id}번 메뉴 삭제 버튼 클릭됨`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <main className="w-full max-w-7xl mx-auto py-10 px-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            메뉴 관리
            <span className="text-sm font-normal text-gray-600">
              총 {menuItems.length}개의 메뉴
            </span>
          </h2>

          <button
            className="flex items-center gap-1.5 bg-black text-white px-5 py-2.5 rounded hover:bg-gray-800 transition-colors text-sm"
            onClick={() => navigate("/add-menuitems")}
          >
            <Plus size={16} />
            <span>메뉴 추가</span>
          </button>
        </div>

        {/* 메뉴 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ManageItemPage;
