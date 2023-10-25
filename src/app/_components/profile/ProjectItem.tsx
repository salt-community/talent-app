import Link from "next/link";
import ItemContainer from "../ItemContainer";
import type { RouterOutputs } from "@/trpc/shared";
type Project = RouterOutputs["project"]["getByDev"][number];

type Props = {
  project: Project;
};

const Project = ({ project: { id, title } }: Props) => {
  return (
    <ItemContainer>
      <Link href={`/profile/project/${id}`}>
        <p>{title}</p>
      </Link>
    </ItemContainer>
  );
};

export default Project;
