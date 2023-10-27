import type { FieldError } from "react-hook-form";

const FormError = ({ error }: { error: FieldError | undefined }) => {
  if (error?.message) return <p className="bg-orange bg-opacity-30 px-2 text-sm rounded-md">{error.message}</p>;
};

export default FormError;
