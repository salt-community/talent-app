import type { Consultant } from "@/types";

export const data: { consultants: Consultant[] } = {
  consultants: [
    {
      id: "1",
      image: "https://avatars.githubusercontent.com/u/144101438?v=4",
      firstName: "Jar",
      lastName: "Jarsson",
      phone: "+46-123-654-789",
      mail: "jarjar.jarsson@gmail.com",
      location: {
        address: "Somewhere 12",
        city: "Stockholm",
        country: "Sweden",
      },
      cv: "url",
      skills: ["Java", "Angular", "Matlab"],
      decription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum risus non turpis efficitur malesuada. In ac tincidunt mauris. Ut cursus ac odio vitae vestibulum. ",
      github: "https://github.com/Jarjarsson",
      linkedin: "link",
      title: "Fullstack Jar Developer",
      recentProjects: [
        {
          title: "Onchainbet",
          youtube:
            "https://www.youtube.com/embed/xApgByKkj8E?si=iETs-xyG1jDwv-eQ",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum risus non turpis efficitur malesuada. In ac tincidunt mauris. Ut cursus ac odio vitae vestibulum. ",
        },
      ],
      teamMembers: ["2", "3", "4"],
    },
    {
      id: "2",
      image: "https://avatars.githubusercontent.com/u/81062114?v=4",
      firstName: "Jou-Fang",
      lastName: "Wang",
      phone: "+46-012-345-678",
      mail: "joufang.w@gmail.com",
      location: {
        address: "Somewhere 12",
        city: "Stockholm",
        country: "Sweden",
      },
      cv: "url",
      skills: ["JavaScript", "TypeScript", "C++", 'Python'],
      decription:
        "With a background in Mechatronics and Architecture, I am a detail-oriented problem solver passionate about IT. I enjoy the challenge of designing products and find being a fullstack developer to be the perfect blend of my engineering and design expertise. My multidimensional perspective enables me to approach tasks from different angles, delivering innovative and user-centric solutions. I am driven to create seamless and intuitive experiences that make a lasting impact. ",
      github: "https://github.com/rofunn",
      linkedin: "https://www.linkedin.com/in/jou-fang-wang-44a14a16b/",
      title: "Fullstack JavaScript Developer",
      recentProjects: [
        {
          title: "Onchainbet",
          youtube:
            "https://www.youtube.com/embed/xApgByKkj8E?si=iETs-xyG1jDwv-eQ",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum risus non turpis efficitur malesuada. In ac tincidunt mauris. Ut cursus ac odio vitae vestibulum. ",
        },
      ],
      teamMembers: ["2", "3", "4"],
    },
    {
      id: "3",
      image: "https://avatars.githubusercontent.com/u/121552608?v=4",
      firstName: "Allan",
      lastName: "Heremi",
      phone: "+46-000-111-222",
      mail: "allan.heremi@appliedtechnology.se",
      location: {
        address: "Wonderland 55",
        city: "Västerås",
        country: "Sweden",
      },
      cv: "url",
      skills: ["Javascript", "Typescript", "Solidity", "Tailwind", "React"],
      decription:
        "I like to code, especially using React. ",
      github: "https://github.com/allanheremi",
      linkedin: "https://www.linkedin.com/in/allanheremi/",
      title: "Fullstack JavaScript Developer",
      recentProjects: [
        {
          title: "Lightblock",
          youtube:
            "https://www.youtube.com/embed/DKBQ63txuZI?si=Ynu5x3UgjLR-M20_",
          description:
            "Dummy data",
        },
      ],
      teamMembers: ["2", "3", "4"],
    },
    {
      id: "4",
      image: "https://avatars.githubusercontent.com/u/49008491?v=4",
      firstName: "Rasmus",
      lastName: "Eklund",
      phone: "+46-000-111-222",
      mail: "rasmus.eklund@appliedtechnology.se",
      location: {
        address: "Somewhere 15",
        city: "City",
        country: "Coutry",
      },
      cv: "url",
      skills: ["JavaScript", "TypeScript", 'React', "Python", 'MongoDB', 'PostgreSQL', 'Prisma'],
      decription:
        "I like to BBQ, drink beer and code",
      github: "https://github.com/rasmus-eklund",
      linkedin: "https://www.linkedin.com/in/rasmus-eklund-36348255/",
      title: "Fullstack JavaScript Developer",
      recentProjects: [
        {
          title: "Salt Talent Pool",
          youtube:
            "https://www.youtube.com/embed/zdOFOxckfHE?si=pEqewn9G_4dmvTJn",
          description:
            "Salt Talent Pool is a portal to see developers",
        },
      ],
      teamMembers: ["2", "3", '4'],
    },
  ],
};
