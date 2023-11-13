export const keys = [
  "name",
  "phone",
  "mail",
  "city",
  "address",
  "country",
  "title",
  "description",
  "resume",
  "linkedinUrl",
] as const;

export const formInfo = {
  name: { placeholder: "First and last name", label: "First and last name" },
  phone: { placeholder: "Phone number", label: "Phone number" },
  mail: { placeholder: "E-mail address", label: "E-mail address" },
  city: { placeholder: "City", label: "City" },
  address: { placeholder: "Address", label: "Address" },
  country: { placeholder: "Country of residence", label: "Country" },
  linkedinUrl: { placeholder: "Link to LinkedIn", label: "LinkedIn link" },
  resume: {
    placeholder: "Link to Resume",
    label:
      "Link to resume. Tip: provide link to shared pdf on your salt google drive.",
  },
  title: {
    placeholder: "E.g Full-stack Java developer",
    label: "Title as developer",
  },
  description: {
    placeholder: "Short description about yourself",
    label: "Short description",
  },
};
