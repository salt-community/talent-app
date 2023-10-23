"use client";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
  devInputSchema,
  devSchema,
  type TdevInputSchema,
  type TDevSchema,
} from "@/utils/zodSchema";

import { useState, type FC, FormEvent } from "react";
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
  const [skill, setSkill] = useState("");
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
          {...register("title")}
          className={className}
          placeholder={"E.g Full-stack Java developer"}
        />
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
