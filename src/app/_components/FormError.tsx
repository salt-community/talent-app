import type { FieldError } from "react-hook-form";

const FormError = ({ error }: { error: FieldError | undefined }) => {
  if (error?.message) return <p className="bg-orange px-1 text-sm">{error.message}</p>;
};

export default FormError;
