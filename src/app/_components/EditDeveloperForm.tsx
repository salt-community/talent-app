"use client";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  firstName: string;
};

const EditDeveloperForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">firstName</label>
      <input type="text" {...register("firstName")} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditDeveloperForm;
