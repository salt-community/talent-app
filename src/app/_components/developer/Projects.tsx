import type { RouterOutputs } from "@/trpc/shared";
import SectionHeader from "../SectionHeader";
import Icon from "@/app/assets/icons/Icon";
type Project = RouterOutputs["developer"]["getById"]["projects"][number];

type Props = {
  projects: Project[];
};
const Projects = ({ projects }: Props) => {
  return (
    <section>
      <ul className="flex flex-col gap-4">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <SectionHeader title={project.title} />{" "}
              <a className="w-8" href={project.githublink} target="_blank">
                <Icon icon="github" className="h-8 w-8 fill-black" />
              </a>
            </div>
            <div className="relative pb-[56.25%]">
              <iframe
                className="absolute left-0 top-0 h-full w-full"
                src={`https://www.youtube.com/embed/${project.youtube}`}
                title={project.title}
                width={"100%"}
                height={"100%"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p>{project.description}</p>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default Projects;
