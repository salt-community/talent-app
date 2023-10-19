import type { FC } from "react";
import SectionHeader from "./SectionHeader";

import type { RouterOutputs } from "@/trpc/shared";

type Project =
  RouterOutputs["developer"]["getById"]["projects"][number]["project"];

type RecentProjectProps = {
  project: Project;
};

const Projects: FC<RecentProjectProps> = ({
  project: { description, title, youtube },
}) => {
  return (
    <div className="flex flex-col gap-4">
      <SectionHeader title={title} />
      <div className="flex flex-col gap-4 md:flex-row">
        <iframe
          src={youtube}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Projects;
