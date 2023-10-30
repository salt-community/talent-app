import Link from "next/link";
import ItemContainer from "../ItemContainer";
import type { RouterOutputs } from "@/trpc/shared";
type Project = RouterOutputs["project"]["getByDev"][number];

type Props = {
  project: Project;
};

const Project = ({ project: { id, title } }: Props) => {
  return (
    <Link href={`/profile/project/${id}`}>
      <ItemContainer>
        <p>{title}</p>
      </ItemContainer>
    </Link>
  );
};

export default Project;
