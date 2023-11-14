import type { DetailedHTMLProps, LiHTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
} & DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;

const ItemContainer = ({ children, className, ...props }: Props) => {
  return (
    <li
      className={`flex h-28 items-center rounded-sm bg-gray drop-shadow-md ${className}`}
      {...props}
    >
      {children}
    </li>
  );
};

export default ItemContainer;
