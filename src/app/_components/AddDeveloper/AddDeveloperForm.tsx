"use client";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { devSchema, type tDevSchema } from "@/utils/zodSchema";

import { useState, type FC, FormEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { getGithubData } from "./getGithubData";

type EditDeveloperFormProps = {
  developer?: tDevSchema;
};

const AddDeveloperForm: FC<EditDeveloperFormProps> = ({ developer }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tDevSchema>({
    mode: "onSubmit",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [skill, setSkill] = useState("");

  const onSubmit: SubmitHandler<tDevSchema> = async (data) => {
    try {
      const gitHubData = await getGithubData(data.gitHubUrl);
      const { gitHubUrl, ...rest } = data;
      const newData: tDevSchema = {
        ...rest,
        ...gitHubData,
        ...{ skills: skills },
      };
      const parsedData = devSchema.safeParse(newData);
      if (!parsedData.success) {
        toast.error("Incorrect github username provided");
      }
      console.log(parsedData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleAddSkill = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSkills((prev) => {
      return [...prev, skill];
    });
  };

  const handleRemoveSkill = (name: string) => {
    setSkills((prev) => prev.filter((skill) => skill !== name));
  };

  const className = "h-10 rounded-md border-2 border-black/50 px-2";
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("name")}
          className={className}
          placeholder={"First and last name"}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          type="text"
          {...register("phone")}
          className={className}
          placeholder={"Phone number"}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          type="text"
          {...register("mail")}
          className={className}
          placeholder={"E-mail address"}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          type="text"
          {...register("city")}
          className={className}
          placeholder={"City"}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          type="text"
          {...register("address")}
          className={className}
          placeholder={"Address"}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          type="text"
          {...register("country")}
          className={className}
          placeholder={"Country of residence"}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          type="text"
          {...register("gitHubUrl")}
          className={className}
          placeholder={"GitHub username"}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          type="text"
          {...register("linkedinUrl")}
          className={className}
          placeholder={"LinkedIn url"}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          type="text"
          {...register("resume")}
          className={className}
          placeholder={"Link to Resume"}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          type="text"
          {...register("description")}
          className={className}
          placeholder={"Short description about yourself"}
        />
        <input
          type="text"
          {...register("title")}
          className={className}
          placeholder={"E.g Full-stack Java developer"}
        />
        <button type="submit">Save</button>
      </form>
      <Skills skills={skills} removeSkill={handleRemoveSkill} />
      <form onSubmit={handleAddSkill}>
        <input
          type="text"
          className={className}
          placeholder={"Your skills"}
          onChange={(e) => setSkill(e.target.value)}
        />
      </form>
    </>
  );
};

type Props = { skills: string[]; removeSkill: (skill: string) => void };
const Skills: FC<Props> = ({ skills, removeSkill }) => {
  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-wrap gap-4">
        {skills.map((skill, index) => (
          <li
            key={skill + index}
            className="flex gap-4 rounded-full bg-orange px-4 py-1 text-white"
          >
            <p>{skill}</p>
            <button className="text-red-800" onClick={() => removeSkill(skill)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddDeveloperForm;
