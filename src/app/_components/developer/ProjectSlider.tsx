"use client";
import type { RouterOutputs } from "@/trpc/shared";
import { useState } from "react";
import DeveloperProject from "./DeveloperProject";
type Project = RouterOutputs["developer"]["getById"]["projects"][number];

type Props = {
  projects: Project[];
};
const ProjectSlider = ({ projects }: Props) => {
  const [project, setProject] = useState(projects[0]);

  return (
    <>
      {project && (
        <section className="flex flex-col gap-2">
          <DeveloperProject project={project} />
          <ul className="flex justify-center gap-2">
            {projects.length > 1 &&
              projects.map((i) => (
                <li key={i.id}>
                  <button
                    onClick={() => setProject(i)}
                    className={`h-5 w-5 rounded-full ${
                      i.id === project.id ? "bg-orange" : "bg-black"
                    }`}
                  ></button>
                </li>
              ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default ProjectSlider;
