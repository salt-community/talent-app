"use client";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { devSchema } from "@/utils/zodSchema";
import type { Developer } from "types";
import type { FC } from "react";

type EditDeveloperFormProps = {
  developer?: Developer;
};

const EditDeveloperForm: FC<EditDeveloperFormProps> = ({ developer }) => {
  const { register, handleSubmit } = useForm<Developer>({
    mode: "onSubmit",
    defaultValues: developer,
  });
  const onSubmit: SubmitHandler<Developer> = async (data) => {
    const parsedData = devSchema.safeParse(data);
    console.log(parsedData);
  };
  const fields = [
    "firstName",
    "lastName",
    "image",
    "phone",
    "mail",
    "city",
    "address",
    "country",
    "github",
    "linkedin",
    "cv",
    "description",
    "skills",
    "title",
  ] as const;
  const className = "h-10 rounded-md border-2 border-black/50 px-2";
  return (
    <>
      <form onSubmit={void handleSubmit(onSubmit)}>
        {fields.map((field) => {
          return (
            <input
              key={field}
              type="text"
              {...register(field)}
              className={className}
              placeholder={field}
            />
          );
        })}
      </form>
    </>
  );
};

export default EditDeveloperForm;
