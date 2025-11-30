import React from "react";
import { type LucideIcon, CheckCircle } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText: string;

  icon?: LucideIcon;
  iconColorClass?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText,
  // 디폴트 아이콘!!!
  icon: Icon = CheckCircle,
  iconColorClass = "text-green-500",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div
        className="bg-white rounded-xl shadow-2xl p-8 max-w-xl w-full aspect-3/2 transform transition-all scale-100 flex justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`h-12 w-12 ${iconColorClass}`}>
            <Icon className="h-full w-full" strokeWidth={2.5} />
          </div>

          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <p className="text-center text-sm text-gray-600 leading-relaxed">
            {message}
          </p>

          <button
            onClick={onClose}
            className="mt-4 w-full py-2 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition duration-150"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
