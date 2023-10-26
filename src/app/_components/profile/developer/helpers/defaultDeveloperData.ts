import type { tDevSchema } from "@/utils/zodSchema";

const defaultDeveloperData = (): tDevSchema => {
  return {
    gitHubUrl: "",
    image: "",
    skills: [],
    name: "",
    phone: "",
    mail: "",
    city: "Stockholm",
    address: "",
    country: "Sweden",
    linkedinUrl: "",
    title: "Fullstack Java Developer",
    resume: "",
    description: "",
  };
};

export default defaultDeveloperData;
