import { Edit2, Trash2 } from "lucide-react";
import type { MenuItemCardProps } from "../../type/mystore";

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 flex flex-col">
      <div className="w-full h-[200px] bg-gray-100 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
            {item.category}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-6 flex-1 break-keep">
          {item.description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-[#E17100]">
            {item.price.toLocaleString()}원
          </span>
          <div className="flex gap-2">
            <button
              className="p-1.5 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              onClick={() => onEdit(item.id)}
            >
              <Edit2 size={18} />
            </button>
            <button
              className="p-1.5 border border-gray-200 rounded text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
