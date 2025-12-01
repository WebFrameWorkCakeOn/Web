import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      className="text-sm font-medium text-gray-600 hover:text-pink-600 cursor-pointer transition duration-150 flex items-center gap-1"
      onClick={() => navigate(-1)}
    >
      &larr; 뒤로 가기
    </button>
  );
};

export default BackButton;
