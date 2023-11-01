import React from "react";

type Props = { children: React.ReactNode; className?: string };

const ItemContainer = ({ children, className }: Props) => {
  return (
    <li
      className={`flex items-center gap-2 rounded-md border-2 border-black/30 p-2 shadow-lg duration-300 ease-linear hover:bg-orange/30 active:bg-orange md:p-4 ${className}`}
    >
      {children}
    </li>
  );
};

export default ItemContainer;
