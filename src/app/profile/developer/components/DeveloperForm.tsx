"use client";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {
  devSchemaPartial,
  githubSchema,
  type tDevSchema,
  type tDevSchemaPartial,
} from "@/utils/zodSchema";
import { type ReactNode, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { keys, formInfo } from "./helpers/formPlaceholders";
import FormError from "../../../_components/FormError";
import SkillsForm from "./SkillsForm";
import GithubForm from "./GithubForm";
import toast from "react-hot-toast";
import LocationsForm from "./LocationsForm";

type Props = {
  developer: tDevSchema;
  handleData: (data: tDevSchema) => void;
  children: ReactNode;
};

const DeveloperForm = ({
  developer,
  handleData: submitValidData,
  children,
}: Props) => {
  const { gitHubUrl, image, skills, locationPref, ...rest } = developer;
  const [gitHub, setGitHub] = useState({
    gitHubUrl,
    image,
  });
  const skillsRef = useRef(skills);
  const locationsRef = useRef(locationPref);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tDevSchemaPartial>({
    mode: "onSubmit",
    defaultValues: rest,
    resolver: zodResolver(devSchemaPartial),
  });
  const onSubmit: SubmitHandler<tDevSchemaPartial> = (data) => {
    if (skillsRef.current.length === 0) {
      toast.error("You have no skills!");
    }
    const newData: tDevSchema = {
      ...data,
      skills: skillsRef.current,
      locationPref: locationsRef.current,
      ...gitHub,
    };
    submitValidData(newData);
  };
  const className = "h-10 rounded-md border-2 border-black/50 px-2 bg-black/10";
  return (
    <div className="flex flex-col gap-2 lg:px-48">
      <form
        id="developer-form"
        className="flex flex-col gap-1"
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      >
        {keys.map((key) => (
          <div className="flex flex-col" key={key}>
            <label className="pt-2 font-semibold" htmlFor={`${key}-input`}>
              {formInfo[key].label}
            </label>
            {key === "description" ? (
              <textarea
                id={`${key}-input`}
                rows={6}
                {...register(key)}
                className={`${className} h-32`}
                placeholder={formInfo[key].placeholder}
              />
            ) : (
              <input
                id={`${key}-input`}
                {...register(key)}
                className={className}
                placeholder={formInfo[key].placeholder}
              />
            )}
            <FormError error={errors[key]} />
          </div>
        ))}
      </form>
      <LocationsForm
        data={locationPref}
        setData={(data) => (locationsRef.current = data)}
      />
      <SkillsForm
        data={skills}
        setData={(data) => (skillsRef.current = data)}
      />
      <GithubForm
        data={{ gitHubUrl, image }}
        setData={(data) => setGitHub(data)}
      />
      {githubSchema.safeParse(gitHub).success && <>{children}</>}
    </div>
  );
};

export default DeveloperForm;
