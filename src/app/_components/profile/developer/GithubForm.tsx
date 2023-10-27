import { useState } from "react";
import { getGitHubUsername, getGithubData } from "./helpers/getGithubData";
import toast from "react-hot-toast";
import type { tGithubSchema } from "@/utils/zodSchema";
import Button from "../../Button";
import FormError from "../../FormError";

type Props = {
  data: tGithubSchema;
  setData: (data: tGithubSchema) => void;
};

const GithubForm = ({ data: { gitHubUrl }, setData }: Props) => {
  const userName = getGitHubUsername(gitHubUrl) ?? "";
  const [gitHubUsername, setGitHubUsername] = useState(userName);
  const [isValid, setIsValid] = useState(Boolean(userName));

  const validateGithub = (username: string) => {
    getGithubData(username)
      .then((data) => {
        setIsValid(true);
        setData({ ...data });
      })
      .catch(() => {
        toast.error("Incorrect github username!");
        setIsValid(false);
        setData({ gitHubUrl: "", image: "" });
      });
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        validateGithub(gitHubUsername);
      }}
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={gitHubUsername}
          onChange={(e) => {
            setIsValid(false);
            setGitHubUsername(e.target.value);
          }}
          className={"h-10 grow rounded-md border-2 border-black/50 px-2"}
          placeholder={"GitHub username"}
        />
        {!isValid && <Button className="h-10">Validate</Button>}
      </div>
      {!isValid && (
        <FormError
          error={{
            type: "required",
            message: "Provide valid GitHub username to continue...",
          }}
        />
      )}
    </form>
  );
};
export default GithubForm;
