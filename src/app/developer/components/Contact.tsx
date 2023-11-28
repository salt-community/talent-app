"use client";
import Icon from "@/app/assets/icons/Icon";
import type { RouterOutputs } from "@/trpc/shared";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

type Developer = RouterOutputs["developer"]["getBySlug"];
type Props = { developer: Developer };

const Contact = ({ developer }: Props) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return;
  }
  return (
    <section className="relative h-8 w-full max-w-5xl self-center">
      <div
        className={`absolute bottom-0 left-0 flex w-full flex-col overflow-hidden bg-white transition-[height] duration-500 ease-in-out ${
          open ? "h-48" : "h-8"
        }`}
      >
        <div
          className="flex h-8 w-full cursor-pointer items-center justify-center rounded-t-md bg-black/20"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
        >
          <Icon icon={open ? "down" : "up"} className="h-7 w-7 fill-black" />
          {!open && <p className="font-semibold">Contact</p>}
        </div>
        {open && <Content developer={developer} />}
      </div>
    </section>
  );
};

const Content = ({ developer }: Props) => {
  return (
    <div className="flex grow flex-col justify-center bg-orange/10 p-5">
      <div className="flex gap-1">
        <Icon icon="phone" className="w-6 fill-black" />
        <a className="text-orange" href={`tel: ${developer.phone}`}>
          {developer.phone}
        </a>
      </div>
      <div className="flex items-center gap-1">
        <Icon icon="mail" className="w-6 fill-black" />
        <a className="text-orange" href={`mailto: ${developer.mail}`}>
          Email
        </a>
      </div>
      <div className="flex items-center gap-1">
        <Icon icon="mapMarker" className="w-6 fill-black" />
        <div className="flex gap-1">
          <p>{developer.city},</p>
          <p>{developer.country}</p>
        </div>
      </div>
      <a
        href={developer.resume}
        target="_blank"
        className="flex items-center gap-1"
      >
        <Icon icon="resume" className="w-6 fill-black" />
        <p className="text-orange">Resume</p>
      </a>
    </div>
  );
};

export default Contact;
