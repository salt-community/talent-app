"use client";
import Icon from "@/app/assets/icons/Icon";
import type { RouterOutputs } from "@/trpc/shared";
import React, { useState } from "react";
type Developer = RouterOutputs["developer"]["getById"];

type Props = { developer: Developer };

const Contact = ({ developer }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`sticky bottom-0 flex flex-col rounded-t-md border-t bg-white transition-[height] duration-500 ease-in-out ${
        open ? "h-96" : "h-8"
      }`}
    >
      <div
        className="flex h-8 cursor-pointer items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <Icon
          icon={open ? "down" : "up"}
          className="h-8 w-8 self-center fill-black"
        />
        {!open && <p>Contact</p>}
      </div>
      {open && (
        <>
          <div className="flex gap-1">
            <Icon icon="phone" className="w-6 fill-black" />
            <p>{developer.phone}</p>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="mail" className="w-6 fill-black" />
            <a
              className="text-orange underline"
              href={`mailto: ${developer.mail}`}
            >
              email me
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
            <p>Resume</p>
          </a>
        </>
      )}
    </div>
  );
};

export default Contact;
