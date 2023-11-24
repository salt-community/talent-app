"use client";
import type { RouterOutputs } from "@/trpc/shared";
import { useState } from "react";
import type { LoadingProps } from "types";
type Developer = RouterOutputs["developer"]["getBySlug"];

const Skills = ({ data }: LoadingProps<Developer>) => {
  const [more, setMore] = useState(false);
  if (data.status === "loading") {
    return (
      <div className="flex h-10 lg:h-8 w-full animate-pulse flex-wrap gap-2 rounded-md">
        <div className="w-16 rounded bg-black/10 md:w-32"></div>
        <div className="w-16 rounded bg-black/10 md:w-32"></div>
        <div className="w-16 rounded bg-black/10 md:w-32"></div>
        <div className="w-16 rounded bg-black/10 md:w-32"></div>
        <div className="w-16 rounded bg-black/10 md:w-32"></div>
        <div className="w-16 rounded bg-black/10 md:w-32"></div>
        <div className="w-16 rounded bg-black/10 md:w-32"></div>
      </div>
    );
  }

  if (data.status === "success") {
    const skills = data.data.skills;
    return (
      <ul className="flex flex-wrap gap-3">
        {skills
          .filter((_, i) => more || i < 6)
          .map((skill, index) => {
            return (
              <li key={skill + index}>
                <p className="rounded-full bg-orange/10 px-2 py-1 text-sm text-black/70">
                  {skill}
                </p>
              </li>
            );
          })}
        {skills.length > 6 && (
          <li>
            <button
              className="self-end text-sm underline underline-offset-2"
              onClick={() => setMore((p) => !p)}
            >
              {more ? "Show less" : "Show more"}
            </button>
          </li>
        )}
      </ul>
    );
  }

  if (data.status === "error") {
    return <p>Something went wrong</p>;
  }
};

export default Skills;
