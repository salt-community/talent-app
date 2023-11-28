"use client";
import Icon from "@/app/assets/icons/Icon";
import type { RouterOutputs } from "@/trpc/shared";
import React, { useState } from "react";
type Developer = RouterOutputs["developer"]["getBySlug"];

type Props = { developer: Developer };

const Contact = ({ developer }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`sticky bottom-0 flex w-screen max-w-5xl flex-col rounded-t-md border-t border-t-black/30 bg-white transition-[height] duration-500 ease-in-out md:w-full ${
        open ? "h-44" : "h-8"
      }`}
    >
      <div className="flex w-full grow flex-col items-center">
        <div
          className="flex h-8 w-full cursor-pointer items-center justify-center rounded-t-md bg-black/10"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
        >
          <Icon
            icon={open ? "down" : "up"}
            className="h-8 w-8 self-center fill-black"
          />
          {!open && <p className="font-semibold">Contact</p>}
        </div>
        {open && (
          <div className="flex w-full grow flex-col items-center justify-center gap-2 bg-orange/10 py-5">
            <div className="flex flex-col justify-center">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
