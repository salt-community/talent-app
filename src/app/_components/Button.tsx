import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  small?: boolean;
  gray?: boolean;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-md border-2 border-black bg-white p-2 text-black transition-colors duration-200 hover:bg-orange hover:text-white disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    ></button>
  );
}

export default Button;
