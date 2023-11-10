import React from "react";

type Props = { children: React.ReactNode; className?: string };

const ItemContainer = ({ children, className }: Props) => {
  return (
    <li
      className={`bg-cardBg mt-2 flex h-28 drop-shadow-md border-b-black items-center gap-2 rounded-sm p-2 lg:px-9 ${className}`}
    >
      {children}
    </li>
  );
};

export default ItemContainer;
