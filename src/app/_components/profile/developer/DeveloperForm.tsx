"use client";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
  devSchemaPartial,
  githubSkillsSchema,
  type tDevSchema,
  type tDevSchemaPartial,
} from "@/utils/zodSchema";
import { useState, type FC } from "react";
import type { RouterInputs } from "@/trpc/shared";
import emptyData from "./helpers/splitDeveloperData";
import { zodResolver } from "@hookform/resolvers/zod";
import { keys, placeholders } from "./helpers/formPlaceholders";
import FormError from "../../FormError";
import SkillsAndGithubForm from "./SkillsAndGithubForm";

type Developer = RouterInputs["developer"]["create"];

type EditDeveloperFormProps = {
  developer?: tDevSchema;
  handleData: (data: Developer) => Promise<void>;
};

const DeveloperForm: FC<EditDeveloperFormProps> = ({
  developer,
  handleData,
}) => {
  const { gitHubUrl, skills, image, ...rest } = emptyData(developer);
  const [skillsGithub, setSkillsGithub] = useState({
    gitHubUrl,
    skills,
    image,
  });
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
      ...skillsGithub,
    };
    await handleData(newData);
  };

  const className = "h-10 rounded-md border-2 border-black/50 px-2";
  return (
    <>
      <form
        id="developer-form"
        className="flex max-w-md flex-col gap-2"
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      >
        {keys.map((key, i) => (
          <>
            <input
              key={key}
              type="text"
              {...register(key)}
              className={className}
              placeholder={placeholders[i]}
            />
            <FormError error={errors[key]} />
          </>
        ))}
      </form>
      <SkillsAndGithubForm
        data={skillsGithub}
        setData={(data) => setSkillsGithub(data)}
      />
      {githubSkillsSchema.safeParse(skillsGithub).success && (
        <button type="submit" form="developer-form">
          Save
        </button>
      )}
    </>
  );
};

export default DeveloperForm;
