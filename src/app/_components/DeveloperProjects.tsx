import type { Project } from "@/types";
import type { FC } from "react";
import SectionHeader from "./SectionHeader";

type RecentProjectProps = {
  project: Project;
};

const Projects: FC<RecentProjectProps> = ({ project }) => {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title={project.title}/>
      <div className="flex flex-col gap-4 md:flex-row">
        <iframe
          src={project.youtube}
          title={project.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p>{project.description}</p>
      </div>
    </div>
  );
};

export default Projects;
