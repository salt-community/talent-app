import type { RouterInputs } from "@/trpc/shared";

type Developer = RouterInputs["developer"]["create"];

const emptyData = (data?: Developer): Developer => {
  if (!data) {
    return {
      gitHubUrl: "",
      image: "",
      skills: [],
      name: "",
      phone: "",
      mail: "",
      city: "",
      address: "",
      country: "",
      linkedinUrl: "",
      resume: "",
      title: "",
      description: "",
    };
  }
  return data;
};

export default emptyData;
