"use client";
import Icon from "@/app/assets/icons/Icon";
import React, { useState } from "react";

type Props = { name: string; comment: string };

const Comment = ({ comment, name }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(true)} className="underline">
        {name}
      </button>
      {open && (
        <div className="absolute right-0 top-0 z-10 flex rounded-md bg-orange p-2">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-1 top-1"
          >
            <Icon icon="close" className="h-8" />
          </button>
          <p className="h-full w-full bg-white p-2 pr-10">{comment}</p>
        </div>
      )}
    </div>
  );
};

export default Comment;
