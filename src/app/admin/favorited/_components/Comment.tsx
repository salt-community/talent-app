"use client";
import React, { useState } from "react";

type Props = { name: string; comment: string };

const Comment = ({ comment, name }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((p) => !p)} className="underline">
        {name}
      </button>
      {open && (
        <p className="absolute right-full top-0 h-full w-full border border-orange bg-white">
          {comment}
        </p>
      )}
    </div>
  );
};

export default Comment;
