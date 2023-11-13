"use client";
import Image from "next/image";
import type { RouterOutputs } from "@/trpc/shared";
import Icon from "@/app/assets/icons/Icon";
import { useSession } from "next-auth/react";
import AddToCart from "./AddToCart";

type Developer = RouterOutputs["developer"]["getById"];

type Props = {
  developer: Developer;
};

const UserCard = ({ developer }: Props) => {
  const { data: session } = useSession();
  return (
    <section className="flex flex-col items-center gap-2 rounded-md bg-gray p-2 md:w-1/4 md:rounded-none">
      <Image
        className="h-28 w-28 rounded-full"
        src={developer.image}
        alt="profile picture"
        width={100}
        height={100}
      />
      <h1 className="font-semibold">{developer.name}</h1>
      <div className="flex gap-2">
        <a href={developer.gitHubUrl} target="_blank">
          <Icon icon="github" className="h-8 w-8 fill-black" />
        </a>
        <a href={developer.linkedinUrl} target="_blank">
          <Icon icon="linkedin" className="h-8 w-8 fill-black" />
        </a>
      </div>
      {session && session.user.role === "CLIENT" && (
        <AddToCart developerId={developer.id} />
      )}
    </section>
  );
};

export default UserCard;
