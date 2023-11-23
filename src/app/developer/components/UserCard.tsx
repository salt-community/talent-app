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
  const [bigImage, setBigImage] = useState(false);
  const router = useRouter();
  if (data.status === "loading") {
    return (
      <div className="flex h-full w-full max-w-5xl items-center justify-center rounded-lg bg-gray py-2">
        <div className="flex animate-pulse flex-col gap-2">
          <div className="h-24 w-24 rounded-full bg-black/10"></div>
          <div className="h-4 w-full rounded bg-black/10"></div>
          <div className="h-4 w-full rounded bg-black/10"></div>
          <div className="h-4 w-full rounded bg-black/10"></div>
        </div>
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
      <>
        {bigImage ? (
          <>
            <div
              onClick={() => setBigImage((p) => !p)}
              className="fixed right-0 top-0 z-10 flex h-screen w-screen cursor-zoom-out items-center bg-black/90"
            ></div>
            <section
              onClick={() => setBigImage((p) => !p)}
              className="relative z-20 flex w-full max-w-5xl cursor-zoom-out justify-center gap-2 bg-black p-2 md:rounded-md"
            >
              <Icon
                icon="close"
                className="absolute right-2 top-2 w-10 fill-white"
              />
              <Image
                className="h-full rounded-full"
                src={developer.image}
                alt="profile picture"
                width={256}
                height={256}
              />
            </section>
          </>
        ) : (
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
                onClick={() => setBigImage((p) => !p)}
                className="h-28 w-28 cursor-zoom-in rounded-full"
                src={developer.image}
                alt="profile picture"
                width={256}
                height={256}
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
        )}
      </>
    );
  }
  if (data.status === "error") {
    return <p>Something went wrong</p>;
  }
};

export default UserCard;
