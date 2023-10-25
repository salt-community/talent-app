import { type FormEvent, useState } from "react";
import type { tSkillsSchema } from "@/utils/zodSchema";
import toast from "react-hot-toast";

type Props = {
  data: tSkillsSchema;
  setData: (data: tSkillsSchema) => void;
};

const SkillsForm = ({ data, setData }: Props) => {
  const [skills, setSkills] = useState<string[]>(data);
  const [skill, setSkill] = useState("");

  const handleAddSkill = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSkills((prev) => {
      if (!skill) {
        toast.error("Cannot add empty skill");
      }
      const newSkills = [...prev, skill];
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
      <Skills skills={skills} removeSkill={handleRemoveSkill} />
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
    </>
  );
};
type SkillsProps = { skills: string[]; removeSkill: (skill: string) => void };
const Skills = ({ skills, removeSkill }: SkillsProps) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <li
          key={skill + index}
          className="flex gap-4 rounded-full bg-orange px-4 py-1 text-white"
        >
          <p>{skill}</p>
          <button
            className="text-black hover:scale-125"
            onClick={() => removeSkill(skill)}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
};
export default SkillsForm;
