"use client";
import Image from "next/image";
import Github from "../../assets/icons/Github";
import { mdilEmail, mdilPhone, mdilMapMarker } from "@mdi/light-js";
import IconTemp from "../../assets/icons/IconTemp";
import LinkedIn from "../../assets/icons/LinkedIn";
import type { RouterOutputs } from "@/trpc/shared";
import { useState } from "react";

type Developer = RouterOutputs["developer"]["getById"];

type ContactCardProps = {
  developer: Developer;
};

const ContactCard = ({ developer }: ContactCardProps) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="rounded-md bg-gray md:w-1/4 md:rounded-none">
      <div className="flex flex-col gap-2 p-2">
        <div className="flex flex-col items-center self-center">
          <Image
            className="h-28 w-28 rounded-full"
            src={developer.image}
            alt="profile picture"
            width={100}
            height={100}
          />
          <h1 className="font-semibold">{developer.name}</h1>
          <div className="flex gap-2">
            <Github url={developer.gitHubUrl} className={"h-8 w-8"} />
            <LinkedIn url={developer.linkedinUrl} className={"h-8 w-8"} />
          </div>
        </div>

        {open && (
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex gap-1">
              <IconTemp path={mdilPhone} />
              <p>{developer.phone}</p>
            </div>
            <div className="flex items-center gap-1">
              <IconTemp path={mdilEmail} />
              <a
                className="text-orange underline"
                href={`mailto: ${developer.mail}`}
              >
                email me
              </a>
            </div>
            <div className="flex items-center gap-1">
              <IconTemp path={mdilMapMarker} />
              <div className="flex gap-1">
                <p>{developer.address}</p>
                <p>{developer.city},</p>
                <p>{developer.country}</p>
              </div>
            </div>
          </div>
        )}
        <button className="self-end" onClick={() => setOpen((p) => !p)}>
          {open ? "Close" : "Contact"}
        </button>
      </div>
    </section>
  );
};

export default ContactCard;
