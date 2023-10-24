import React from "react";

type Props = { children: React.ReactNode; className?: string };

const Container = ({ children, className }: Props) => {
  return (
    <li
      className={`flex items-center gap-2 rounded-md border-2 border-black/30 p-2 shadow-lg duration-500 ease-linear hover:bg-orange/50 md:p-4 ${className}`}
    >
      {children}
    </li>
  );
};

export default Container;
