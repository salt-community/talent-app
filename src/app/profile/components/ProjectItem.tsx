import Link from "next/link";
import ItemContainer from "../../_components/ItemContainer";
import type { RouterOutputs } from "@/trpc/shared";
type Project = RouterOutputs["project"]["getByDev"][number];

type Props = {
  project: Project;
};

const Project = ({ project: { id, title } }: Props) => {
  return (
    <Link href={`/profile/project/${id}`}>
      <ItemContainer className="px-5">
        <p>{title}</p>
      </ItemContainer>
    </Link>
  );
};

export default Project;
