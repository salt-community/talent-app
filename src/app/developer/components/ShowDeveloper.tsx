"use client";
import UserCard from "@/app/developer/components/UserCard";
import Skills from "@/app/developer/components/Skills";
import TeamMembers from "@/app/developer/components/Team";
import Projects from "@/app/developer/components/Projects";
import Contact from "@/app/developer/components/Contact";
import GitHubCalendar from "./GitHubContributions/GitHubContributions";
import { useState, type ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import Icon from "@/app/assets/icons/Icon";
import type { RouterOutputs } from "@/trpc/shared";

const options = ["Skills", "Bio", "Projects"] as const;

type Developer = RouterOutputs["developer"]["getBySlug"];
type Option = (typeof options)[number];
type Props = { developer: Developer };

const ShowDeveloper = ({ developer }: Props) => {
  const [view, setView] = useState<Option>("Skills");
  const xs = useMediaQuery({ query: "(max-width: 360px)" });
  const sm = useMediaQuery({ query: "(max-width: 480px)" });
  return (
    <>
      <main className="flex grow flex-col items-center gap-14 overflow-y-auto p-5">
        <UserCard developer={developer} />
        <section className="relative flex w-full grow flex-col gap-10 rounded-b-md border border-black/20 p-5 shadow-lg md:max-w-5xl">
          <nav className="absolute bottom-full left-[-1px] right-[-1px] flex">
            {options
              .filter((i) =>
                i === "Projects"
                  ? developer.projects.length !== 0 &&
                    developer.mobs.length !== 0
                  : true,
              )
              .map((i) => (
                <button
                  key={`${i}-button`}
                  className={`relative top-0 grow select-none rounded-t-md border border-black/20 bg-white py-1 text-center font-primary tracking-widest transition-colors duration-300 md:w-40 md:grow-0 md:tracking-wide  ${
                    view === i && "border-b-0 font-bold"
                  }`}
                  onClick={() => setView(i)}
                >
                  {i}
                </button>
              ))}
          </nav>
          {view === "Skills" && (
            <>
              <Article>
                <Skills skills={developer.skills} />
              </Article>
              <Article>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-medium md:text-3xl">GitHub</h2>
                  <a href={developer.gitHubUrl} target="_blank">
                    <Icon icon="github" className="h-10 w-10 fill-black" />
                  </a>
                </div>
                <div className="[&_svg]:w-full">
                  <GitHubCalendar
                    username={developer.gitHubUsername}
                    fontSize={xs ? 10 : sm ? 12 : 16}
                    colorScheme="light"
                    blockSize={xs ? 5 : sm ? 6 : 16}
                    blockMargin={sm ? 1 : 4}
                    blockRadius={sm ? 1 : 2}
                  />
                </div>
              </Article>
            </>
          )}
          {view === "Bio" && (
            <Article title={developer.title}>
              {/*@DEV ask in meeting which looks better, justify or default */}
              <p className="text-justify font-primary">
                {developer.description}
              </p>
            </Article>
          )}
          <article
            className={`flex-col gap-4 ${
              view === "Projects" ? "flex" : "hidden"
            }`}
          >
            <Projects projects={developer.projects} />
          </article>
          {view === "Projects" && developer.mobs.length > 0 && (
            <Article title="Team">
              <TeamMembers mob={developer.mobs[0]!} />
            </Article>
          )}
        </section>
      </main>
      <Contact developer={developer} />
    </>
  );
};

type ArticleProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};
const Article = ({ title, children, className }: ArticleProps) => {
  const [slide, setSlide] = useState(true);
  setTimeout(() => {
    setSlide(false);
  }, 100);
  return (
    <article
      className={`flex flex-col gap-4 transition-all duration-500 ${
        slide ? "translate-y-20 opacity-0" : "translate-x-0 opacity-100"
      } ${className}`}
    >
      {title && <h2 className="text-xl font-medium md:text-3xl">{title}</h2>}
      {children}
    </article>
  );
};

export default ShowDeveloper;
