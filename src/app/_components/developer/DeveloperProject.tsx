import SectionHeader from "../SectionHeader";
import type { RouterOutputs } from "@/trpc/shared";
type Project = RouterOutputs["developer"]["getById"]["projects"][number];

type Props = {
  project: Project;
};

const DeveloperProject = ({ project }: Props) => {
  return (
    <div key={project.id} className="flex flex-col gap-4">
      <SectionHeader title={project.title} />
      <div className="flex flex-col gap-4 md:flex-row">
        <iframe
          src={`https://www.youtube.com/embed/${project.youtube}`}
          title={project.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p>{project.description}</p>
      </div>
    </div>
  );
};

export default DeveloperProject;
