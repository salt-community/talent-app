export type Consultant = {
  image: string;
  firstName: string;
  lastName: string;
  phone: string;
  mail: string;
  location: { city: string; address: string; country: string };
  github: string;
  linkedin: string;
  cv: string;
  decription: string;
  skills: string[];
  title: string;
  recentProjects: Project[];
  teamMembers: string[];
};

export type Project = {
  title: string;
  youtube: string;
  description: string;
};

export type SearchResult = {
  firstName: string;
  lastName: string;
  decription: string;
  skills: string[];
  id: string;
  title: string;
};
