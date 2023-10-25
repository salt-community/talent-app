import { type FormEvent, useState } from "react";
import { getGitHubUsername, getGithubData } from "./helpers/getGithubData";
import toast from "react-hot-toast";
import type { tGithubSkillsSchema } from "@/utils/zodSchema";

type Props = {
  data: tGithubSkillsSchema;
  setData: (data: tGithubSkillsSchema) => void;
};

const SkillsAndGithubForm = ({
  data: { gitHubUrl, skills: skillsData },
  setData,
}: Props) => {
  const [skills, setSkills] = useState<string[]>(skillsData);
  const [skill, setSkill] = useState("");
  const [gitHubUsername, setGitHubUsername] = useState(
    getGitHubUsername(gitHubUrl) ?? "",
  );

  const handleAddSkill = () => {
    setSkills((prev) => {
      return [...prev, skill];
    });
    setSkill("");
  };

  const handleRemoveSkill = (name: string) => {
    setSkills((prev) => prev.filter((skill) => skill !== name));
  };

  const validateGithub = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await getGithubData(gitHubUsername);
      setData({ ...data, skills });
    } catch (error) {
      toast.error("Incorrect github username!");
      setData({ gitHubUrl: "", image: "", skills });
    }
  };
  return (
    <>
      <Skills skills={skills} removeSkill={handleRemoveSkill} />
      <form
        className="flex max-w-md flex-col gap-2"
        onSubmit={(event) => void validateGithub(event)}
      >
        <div className="flex gap-2">
          <input
            type="text"
            name="skills"
            className={"h-10 grow rounded-md border-2 border-black/50 px-2"}
            placeholder={"Your skills"}
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            }}
          />
          <button
            className="w-20 rounded-md border-2 border-orange"
            onClick={handleAddSkill}
            type="button"
          >
            Add skill
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={gitHubUsername}
            onChange={(e) => setGitHubUsername(e.target.value)}
            className={"h-10 grow rounded-md border-2 border-black/50 px-2"}
            placeholder={"GitHub username"}
          />
          <button
            className="w-20 rounded-md border-2 border-orange"
            type="submit"
          >
            Validate
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
export default SkillsAndGithubForm;
