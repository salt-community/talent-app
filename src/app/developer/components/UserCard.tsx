"use client";
import Image from "next/image";
import type { RouterOutputs } from "@/trpc/shared";
import Icon from "@/app/assets/icons/Icon";
import { useSession } from "next-auth/react";
import AddToCart from "./AddToCart";
import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";
import type { LoadingProps } from "types";
import { useState } from "react";
import { NextDev, PrevDev } from "./developerNavigation/DevButtons";
import parseLocalStorage from "./developerNavigation/parseLocalStorage";

type Developer = RouterOutputs["developer"]["getBySlug"];

const UserCard = ({ data }: LoadingProps<Developer>) => {
  const { data: session } = useSession();
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  if (data.status === "loading") {
    return (
      <div className="my-2 flex h-[12rem] w-[12rem] animate-pulse flex-col items-center rounded-lg bg-gray p-4">
        <div className=" mb-4 h-24 w-24 rounded-full bg-black/10"></div>
        <div className="mb-4 h-4 w-full rounded bg-black/10"></div>
        <div className="h-4 w-full rounded bg-black/10"></div>
      </div>
    );
  }
  if (data.status === "success") {
    const developer = data.data;
    const { next, prev, search } = parseLocalStorage(developer.slug);
    const locations = showMore
      ? developer.locationPref
      : developer.locationPref.slice(0, 3);
    return (
      <section className="relative flex w-full max-w-5xl items-center justify-between gap-2 bg-gray p-2 md:rounded-md">
        <button
          onClick={() => router.push(`/?search=${search}`)}
          className="absolute left-2 top-2 w-10"
        >
          <Icon icon="arrowLeft" className="h-10 fill-black" />
        </button>
        <PrevDev slug={prev} />
        <div className="flex flex-col items-center gap-2">
          <Image
            className="h-28 w-28 rounded-full"
            src={developer.image}
            alt="profile picture"
            width={100}
            height={100}
          />
          <h1 className="text-center text-2xl font-semibold">
            {developer.name}
          </h1>
          {!!developer.locationPref.length && (
            <div className="flex select-none flex-col gap-1">
              <p className="text-center text-sm text-black/60">
                Open for work in
              </p>
              <ul className="flex flex-wrap items-center justify-center gap-1">
                {locations.map((loc, i, arr) => (
                  <li className="relative flex" key={loc}>
                    <p className="text-sm text-orange/90">{`${loc}${
                      i !== arr.length - 1 ? "," : ""
                    }`}</p>
                    {i === 0 && (
                      <Icon
                        icon="mapMarker"
                        className="absolute -left-[17px] top-0 h-4"
                      />
                    )}
                  </li>
                ))}
              </ul>
              {developer.locationPref.length > 3 && (
                <button
                  className="w-fit self-center text-sm underline underline-offset-2"
                  onClick={() => setShowMore((p) => !p)}
                >
                  {showMore ? "Show less" : "Show more"}
                </button>
              )}
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
          {!session && (
            <Button callToAction onClick={() => router.push("/login")}>
              Sign In to add to cart
            </Button>
          )}
        </div>
        <NextDev slug={next} />
      </section>
    );
  }
  if (data.status === "error") {
    return <p>Something went wrong</p>;
  }
};

export default UserCard;
