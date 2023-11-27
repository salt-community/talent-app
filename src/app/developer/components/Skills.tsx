"use client";
import type { RouterOutputs } from "@/trpc/shared";
import { useState } from "react";
type Skills = RouterOutputs["developer"]["getBySlug"]["skills"];
type Props = { skills: Skills };
const Skills = ({ skills }: Props) => {
  const [more, setMore] = useState(false);
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {skills
        .filter((_, i) => more || i < 6)
        .map((skill) => {
          return (
            <li key={`${skill}-skill`}>
              <p
                className={`rounded-full bg-black/5 px-2 py-1 text-sm text-black `}
              >
                {skill}
              </p>
            </li>
          );
        })}
      {skills.length > 6 && (
        <li>
          <button
            className="self-end px-2 py-1 text-sm underline underline-offset-2"
            onClick={() => setMore((p) => !p)}
          >
            {more ? "Show less" : "Show more"}
          </button>
        </li>
      )}
    </ul>
  );
};

export default Skills;
