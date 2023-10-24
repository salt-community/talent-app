import { RouterOutputs } from "@/trpc/shared";
import Image from "next/image";
import Link from "next/link";
type Project = RouterOutputs["project"]["getByDev"][number];

type Props = {
  project: Project;
};

const Project = ({ project: { id, title } }: Props) => {
  return (
    <li>
      <Link
        className={
          "flex items-center gap-2 rounded-md border-2 border-black/30 p-2 shadow-lg duration-500 ease-linear hover:bg-orange/50 md:p-4"
        }
        href={`/profile/project/${id}`}
      >
        <p>{title}</p>
      </Link>
    </li>
  );
};

export default Project;
