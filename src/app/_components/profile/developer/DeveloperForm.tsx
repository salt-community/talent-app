"use client";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
  devSchemaPartial,
  githubSchema,
  skillsSchema,
  type tDevSchema,
  type tDevSchemaPartial,
} from "@/utils/zodSchema";
import { useRef } from "react";
import type { RouterInputs } from "@/trpc/shared";
import emptyData from "./helpers/splitDeveloperData";
import { zodResolver } from "@hookform/resolvers/zod";
import { keys, placeholders } from "./helpers/formPlaceholders";
import FormError from "../../FormError";
import SkillsForm from "./SkillsForm";
import GithubForm from "./GithubForm";

type Developer = RouterInputs["developer"]["create"];

type Props = {
  developer?: tDevSchema;
  handleData: (data: Developer) => Promise<void>;
};

const DeveloperForm = ({ developer, handleData }: Props) => {
  const { gitHubUrl, skills, image, ...rest } = emptyData(developer);
  const githubRef = useRef({ gitHubUrl, image });
  const skillsRef = useRef(skills);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tDevSchemaPartial>({
    mode: "onSubmit",
    defaultValues: rest,
    resolver: zodResolver(devSchemaPartial),
  });
  const onSubmit: SubmitHandler<tDevSchemaPartial> = async (data) => {
    const newData: tDevSchema = {
      ...data,
      skills: skillsRef.current,
      ...githubRef.current,
    };
    await handleData(newData);
  };
  const className = "h-10 rounded-md border-2 border-black/50 px-2";
  return (
    <div className="flex flex-col gap-2">
      <form
        id="developer-form"
        className="flex max-w-md flex-col gap-1"
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      >
        {keys.map((key, i) => (
          <div className="flex flex-col" key={key}>
            <input
              type="text"
              {...register(key)}
              className={className}
              placeholder={placeholders[i]}
            />
            <FormError error={errors[key]} />
          </div>
        ))}
      </form>
      <SkillsForm
        data={skills}
        setData={(data) => {
          skillsRef.current = data;
        }}
      />
      <GithubForm
        data={{ gitHubUrl, image }}
        setData={(data) => {
          githubRef.current = { ...githubRef.current, ...data };
        }}
      />

      {githubSchema.safeParse(githubRef.current).success &&
        skillsSchema.safeParse(skillsRef.current).success && (
          <button type="submit" form="developer-form">
            Save
          </button>
        )}
    </div>
  );
};

export default DeveloperForm;
