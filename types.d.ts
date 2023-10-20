export type Developer = {
  firstName: string;
  lastName: string;
  image: string;
  phone: string;
  mail: string;
  city: string;
  address: string;
  country: string;
  github: string;
  linkedin: string;
  cv: string;
  description: string;
  skills: string;
  title: string;
};

export type SearchResult = {
  firstName: string;
  lastName: string;
  description: string;
  skills: string[];
  id: string;
  title: string;
};

export type GithubApiResponse = {
  avatar_url: string;
  url: string;
}