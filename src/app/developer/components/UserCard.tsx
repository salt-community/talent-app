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
      <h1 className="text-center text-2xl font-semibold">{developer.name}</h1>
      {!!developer.locationPref.length && (
        <div className="flex flex-col gap-1">
          <p className="text-center text-sm text-black/60">
            Open for work in...
          </p>
          <ul className="relative flex flex-wrap items-center gap-1">
            <Icon
              icon="mapMarker"
              className="absolute -left-[17px] top-0 h-4"
            />
            {developer.locationPref.slice(0, 3).map((loc, i, arr) => (
              <li className="text-sm text-orange/90" key={loc}>
                {`${loc}${i !== arr.length - 1 ? "," : ""}`}
              </li>
            ))}
          </ul>
        </div>
      )}
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
