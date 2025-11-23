import { Link } from "react-router-dom";
import { hoverEffect } from "../Navbar";

interface SectionHeaderProps {
  title: string;
  description: string;
  linkText: string;
  linkTo: string;
  className?: string;
}

const SectionHeader = ({
  title,
  description,
  linkText,
  linkTo,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="w-full flex flex-col gap-4">
        <div className="text-2xl">{title}</div>
        <div className="text-lg text-[#717182]">{description}</div>
      </div>
      <Link
        className={`w-25 h-10 border border-black/30 text-lg rounded-2xl flex items-center justify-center ${hoverEffect}`}
        to={linkTo}
      >
        {linkText}
      </Link>
    </div>
  );
};

export default SectionHeader;
