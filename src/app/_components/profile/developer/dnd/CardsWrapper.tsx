import type { ReactNode } from "react";

const CardsWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

export default CardsWrapper;
