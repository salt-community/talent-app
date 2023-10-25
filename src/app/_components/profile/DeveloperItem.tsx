import type { RouterOutputs } from "@/trpc/shared";
import Image from "next/image";
import Link from "next/link";
import Container from "../Container";
type NullableDeveloper = RouterOutputs["developer"]["getByUser"];
type Developer = NonNullable<NullableDeveloper>;
type Props = {
  developer: Developer;
};

const Developer = ({ developer: { id, image, name } }: Props) => {
  return (
    <Link href={`/profile/developer/${id}`}>
      <Container>
        <Image
          className="rounded-full"
          src={image}
          alt="profile picture"
          width={48}
          height={48}
        />
        <p>{name}</p>
      </Container>
    </Link>
  );
};

export default Developer;