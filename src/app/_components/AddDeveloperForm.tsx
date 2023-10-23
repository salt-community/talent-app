"use client";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
  devInputSchema,
  devSchema,
  type TdevInputSchema,
  type TDevSchema,
} from "@/utils/zodSchema";

import { useState, type FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getGithubData } from "@/server/gitHub";
import toast from "react-hot-toast";

type EditDeveloperFormProps = {
  developer?: TDevSchema;
};

const AddDeveloperForm: FC<EditDeveloperFormProps> = ({ developer }) => {
  const { register, handleSubmit } = useForm<TdevInputSchema>({
    mode: "onSubmit",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const onSubmit: SubmitHandler<TdevInputSchema> = async (data) => {
    const gitHubData = await getGithubData(data.gitHubUserName);
    const { gitHubUserName, ...rest } = data;
    const newData: TDevSchema = { ...rest, ...gitHubData };
    const parsedData = devSchema.safeParse(newData);
    if (!parsedData.success) {
      toast.error("Incorrect github username provided");
    }
    console.log(parsedData);
  };

  const className = "h-10 rounded-md border-2 border-black/50 px-2";
  return (
    <>
      <form onSubmit={void handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("name")}
          className={className}
          placeholder={"First and last name"}
        />
        <input
          type="text"
          {...register("phone")}
          className={className}
          placeholder={"Phone number"}
        />
        <input
          type="text"
          {...register("mail")}
          className={className}
          placeholder={"E-mail address"}
        />
        <input
          type="text"
          {...register("city")}
          className={className}
          placeholder={"City"}
        />
        <input
          type="text"
          {...register("address")}
          className={className}
          placeholder={"Address"}
        />{" "}
        <input
          type="text"
          {...register("country")}
          className={className}
          placeholder={"Country of residence"}
        />
        <input
          type="text"
          {...register("gitHubUserName")}
          className={className}
          placeholder={"GitHub username"}
        />
        <input
          type="text"
          {...register("linkedinUrl")}
          className={className}
          placeholder={"LinkedIn url"}
        />
        <input
          type="text"
          {...register("resume")}
          className={className}
          placeholder={"Link to Resume"}
        />
        <input
          type="text"
          {...register("description")}
          className={className}
          placeholder={"Short description about yourself"}
        />
        <input
          type="text"
          {...register("skills")}
          className={className}
          placeholder={"Your skills"}
        />
        <input
          type="text"
          {...register("title")}
          className={className}
          placeholder={"E.g Full-stack Java developer"}
        />
      </form>
    </>
  );
};

export default AddDeveloperForm;
