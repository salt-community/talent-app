import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  inverted?: boolean;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({
  className = "",
  inverted = false,
  ...props
}: ButtonProps) {
  const colors = inverted
    ? "bg-orange hover:bg-gray text-white hover:text-black"
    : "bg-gray hover:bg-orange text-black hover:text-white";
  return (
    <button
      className={`${colors} ${className} rounded-md border-2 border-black px-2 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50`}
      {...props}
    ></button>
  );
}

export default Button;
