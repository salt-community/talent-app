import type { tDevSchema } from "@/utils/zodSchema";

const emptyData = (data?: tDevSchema): tDevSchema => {
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
