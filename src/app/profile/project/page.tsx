"use client";
import { projectSchema, type tProjectSchema } from "@/utils/zodSchema";
import { type SubmitHandler, useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import getId from "@/app/_components/AddDeveloper/getYTid";
import toast from "react-hot-toast";

const ProjectPage = () => {
  const { mutate: addProject } = api.project.create.useMutation({
    // onSuccess: () => {},
    // onError: () => {},
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tProjectSchema>({
    mode: "onSubmit",
    resolver: zodResolver(projectSchema),
  });
  const onSubmit: SubmitHandler<tProjectSchema> = (data) => {
    const yt = getId(data.youtube);
    if (!yt) {
      return toast.error("Incorrect youtube link");
    }
    addProject({ ...data, youtube: yt });
  };
  const className = "h-10 rounded-md border-2 border-black/50 px-2";
  const fields = ["title", "youtube", "description", "githubLink"] as const;
  return (
    <div>
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        {fields.map((field) => {
          return (
            <div key={field} className="flex gap-2">
              <input
                className={className}
                placeholder={field}
                {...register(field)}
              />
              <InputError error={errors[field]} />
            </div>
          );
        })}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const InputError = ({ error }: { error: FieldError | undefined }) => {
  if (error?.message) return <p>{error.message}</p>;
};

export default ProjectPage;
