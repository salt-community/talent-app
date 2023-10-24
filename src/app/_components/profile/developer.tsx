import { RouterOutputs } from "@/trpc/shared";
import Image from "next/image";
import Link from "next/link";
type User = RouterOutputs["developer"]["getByUserId"][number];

type Props = {
  user: User;
};

const Developer = ({ user: { image, id, name } }: Props) => {
  return (
    <li>
      <Link
        className={
          "flex items-center gap-2 rounded-md border-2 border-black/30 p-2 shadow-lg duration-500 ease-linear hover:bg-orange/50 md:p-4"
        }
        href={`/profile/developer/${id}`}
      >
        <Image
          className="rounded-full"
          src={image}
          alt="profile picture"
          width={48}
          height={48}
        />
        <p>{name}</p>
      </Link>
    </li>
  );
};

export default Developer;
