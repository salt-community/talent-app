"use client";
import { projectSchema, type tProjectSchema } from "@/utils/zodSchema";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import getId from "@/app/_components/profile/developer/helpers/getYTid";
import toast from "react-hot-toast";
import FormError from "../../FormError";
import type { ReactNode } from "react";

type Props = {
  project?: tProjectSchema;
  handleData: (data: tProjectSchema) => void;
  children: ReactNode;
};
const ProjectForm = ({ project, handleData, children }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tProjectSchema>({
    mode: "onSubmit",
    resolver: zodResolver(projectSchema),
    defaultValues: project,
  });
  const onSubmit: SubmitHandler<tProjectSchema> = (data) => {
    const yt = getId(data.youtube);
    if (!yt) {
      return toast.error("Incorrect youtube link");
    }
    handleData({ ...data, youtube: yt });
  };
  const fields = ["title", "youtube", "description", "githubLink"] as const;
  return (
    <form
      className="flex flex-col gap-1"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      {fields.map((field) => {
        return (
          <div key={field} className="flex gap-2">
            <input
              className={"h-10 grow rounded-md border-2 border-black/50 px-2"}
              placeholder={field}
              {...register(field)}
            />
            <FormError error={errors[field]} />
          </div>
        );
      })}
      {children}
    </form>
  );
};

export default ProjectForm;
