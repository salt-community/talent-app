import { type FormEvent, useState } from "react";
import { getGitHubUsername, getGithubData } from "./helpers/getGithubData";
import toast from "react-hot-toast";
import type { tGithubSchema } from "@/utils/zodSchema";

type Props = {
  data: tGithubSchema;
  setData: (data: tGithubSchema) => void;
};

const GithubForm = ({ data: { gitHubUrl }, setData }: Props) => {
  const [gitHubUsername, setGitHubUsername] = useState(
    getGitHubUsername(gitHubUrl) ?? "",
  );

  const validateGithub = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await getGithubData(gitHubUsername);
      setData({ ...data });
    } catch (error) {
      toast.error("Incorrect github username!");
      setData({ gitHubUrl: "", image: "" });
    }
  };
  return (
    <>
      <form
        className="flex max-w-md flex-col gap-2"
        onSubmit={(event) => void validateGithub(event)}
      >
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
export default GithubForm;
