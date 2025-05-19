import React from "react";

const Button = ({ text, className = "", onClick, type = "button" }) => {
  const baseStyles =
    "font-semibold text-[#3B2171] bg-white w-40 h-10 rounded-md text-xl transition duration-200 border-2 border-[#432383] hover:bg-[#3B2171] hover:text-white hover:border-white hover:border-solid active:scale-95 ";
  
  return (
    <button
      type={type}          
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
