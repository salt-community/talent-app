import ProjectForm from "@/app/_components/profile/project/ProjectForm";
import { api } from "@/trpc/server";
import React from "react";

type Props = { params: { id: string } };

const ProjectPage = async ({ params: { id } }: Props) => {
  const projects = api.project.getByDev.query()
  return <div><ProjectForm handleData={} project={}/></div>;
};

export default ProjectPage;
