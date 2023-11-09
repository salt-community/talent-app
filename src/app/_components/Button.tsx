import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  inverted?: boolean;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({
  className: inClass = "",
  inverted = false,
  ...props
}: ButtonProps) {
  const className = {
    colors: inverted
      ? "bg-orange md:hover:bg-gray text-white md:hover:text-black"
      : "bg-gray md:hover:bg-orange text-black md:hover:text-white",
  };
  return (
    <button
      className={`${className.colors} ${inClass} rounded-md border-2 border-black px-2 transition-colors duration-200 active:bg-orange disabled:cursor-not-allowed disabled:opacity-50`}
      {...props}
    ></button>
  );
}

export default Button;
