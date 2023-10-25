import { type FormEvent, useState } from "react";
import type { tSkillsSchema } from "@/utils/zodSchema";
import toast from "react-hot-toast";
import TrashIcon from "@/app/assets/icons/TrashIcon";
import splitSkills from "./helpers/splitSkills";

type Props = {
  data: tSkillsSchema;
  setData: (data: tSkillsSchema) => void;
};

const SkillsForm = ({ data, setData }: Props) => {
  const [skills, setSkills] = useState<string[]>(data);
  const [skill, setSkill] = useState("");

  const handleAddSkill = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!skill) {
      toast.error("Cannot add empty skill");
      return;
    }
    setSkills((prev) => {
      const newSkills = [...prev, ...splitSkills(skill)];
      setData(newSkills);
      return newSkills;
    });
    setSkill("");
  };

  const handleRemoveSkill = (name: string) => {
    setSkills((prev) => {
      const newSkills = prev.filter((skill) => skill !== name);
      setData(newSkills);
      return newSkills;
    });
  };

  return (
    <>
      <form className="flex max-w-md flex-col gap-2" onSubmit={handleAddSkill}>
        <div className="flex gap-2">
          <input
            type="text"
            name="skills"
            className={"h-10 grow rounded-md border-2 border-black/50 px-2"}
            placeholder={"Your skills"}
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
          <button
            className="w-20 rounded-md border-2 border-orange"
            type="submit"
          >
            Add skill
          </button>
        </div>
      </form>
      <Skills skills={skills} removeSkill={handleRemoveSkill} />
    </>
  );
};
type SkillsProps = { skills: string[]; removeSkill: (skill: string) => void };
const Skills = ({ skills, removeSkill }: SkillsProps) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <li
          onClick={() => removeSkill(skill)}
          key={skill + index}
          className="group flex select-none items-center gap-2 rounded-full bg-orange px-4 py-1 text-sm text-white"
        >
          <p>{skill}</p>
          <TrashIcon className="w-6 fill-white group-hover:fill-black" />
        </li>
      ))}
    </ul>
  );
};
export default SkillsForm;
