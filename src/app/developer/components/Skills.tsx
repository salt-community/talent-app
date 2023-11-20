"use client";
import { useState } from "react";
type Props = { skills: string[] };

const Skills = ({ skills }: Props) => {
  const [more, setMore] = useState(false);
  return (
    <ul className="flex flex-wrap gap-3">
      {skills
        .filter((_, i) => more || i < 4)
        .map((skill, index) => {
          return (
            <li key={skill + index}>
              <p className="rounded-full bg-orange/10 px-2 py-1 text-sm text-black/70">
                {skill}
              </p>
            </li>
          );
        })}
      <li>
        {skills.length > 4 && (
          <button
            className="text-sm underline underline-offset-2"
            onClick={() => setMore((p) => !p)}
          >
            {more ? "Show less" : "Show more"}
          </button>
        )}
      </li>
    </ul>
  );
};

export default Skills;
