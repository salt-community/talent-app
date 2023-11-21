import type { RouterOutputs } from "@/trpc/shared";
import SectionHeader from "./SectionHeader";
import Icon from "@/app/assets/icons/Icon";
import type { LoadingProps } from "types";
type Developer = RouterOutputs["developer"]["getBySlug"];

const Projects = ({ data }: LoadingProps<Developer>) => {
  if (data.status === "loading") {
    return (
      <div className="relative pb-[56.25%] bg-black/10 animate-pulse">
        <div className="absolute left-0 top-0 h-full w-full"></div>
      </div>
    );
  }
  if (data.status === "success") {
    const projects = data.data.projects;
    return (
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
    );
  }
  if (data.status === "error") {
    return <p>Something went wrong...</p>;
  }
};

export default Projects;
