"use client";
import { mobSchema, type tMobSchema } from "@/utils/zodSchema";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../../../_components/FormError";
import type { ReactNode } from "react";

type Props = {
  mob?: tMobSchema;
  handleData: (data: tMobSchema) => void;
  children: ReactNode;
};
const MobForm = ({ mob, handleData, children }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tMobSchema>({
    mode: "onSubmit",
    resolver: zodResolver(mobSchema),
    defaultValues: mob,
  });
  const onSubmit: SubmitHandler<tMobSchema> = (data) => {
    handleData(data);
  };
  return (
    <form
      className="flex flex-col gap-1"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <input
        className={"h-10 grow rounded-md border-2 border-black/50 px-2"}
        placeholder={"name"}
        {...register("name")}
      />
      <FormError error={errors.name} />
      {children}
    </form>
  );
};

export default MobForm;
