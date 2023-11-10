import React from "react";

type Props = { children: React.ReactNode; className?: string };

const ItemContainer = ({ children, className }: Props) => {
  return (
    <li
      className={`flex h-28 items-center gap-4 rounded-sm bg-gray p-2 drop-shadow-md lg:px-9 ${className}`}
    >
      {children}
    </li>
  );
};

export default ItemContainer;
