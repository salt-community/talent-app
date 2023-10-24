import Link from "next/link";
import Container from "../container";
import type { RouterOutputs } from "@/trpc/shared";
type Project = RouterOutputs["project"]["getByDev"][number];

type Props = {
  project: Project;
};

const Project = ({ project: { id, title } }: Props) => {
  return (
    <Container>
      <Link href={`/profile/project/${id}`}>
        <p>{title}</p>
      </Link>
    </Container>
  );
};

export default Project;
