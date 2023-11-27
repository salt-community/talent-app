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
import type { Session } from "next-auth";

const options = ["Skills", "Bio", "Projects"] as const;

type Developer = RouterOutputs["developer"]["getBySlug"];
type Option = (typeof options)[number];
type Props = { developer: Developer; session: Session | null };

const ShowDeveloper = ({ developer, session }: Props) => {
  const [view, setView] = useState<Option>("Skills");
  const xs = useMediaQuery({ query: "(max-width: 360px)" });
  const sm = useMediaQuery({ query: "(max-width: 480px)" });
  return (
    <main
      className={`flex grow flex-col items-center bg-gradient-to-b from-orange to-pink md:gap-5 md:px-5 md:pt-5 ${
        !session && "pb-5"
      }`}
    >
      <UserCard developer={developer} />
      <section className="flex w-full grow flex-col gap-10 border-t border-t-black/30 bg-gray px-5 pt-5 md:max-w-5xl md:rounded-md">
        <nav className="flex justify-around">
          {options.map((i) => (
            <button
              key={`${i}-button`}
              className={`border-black/15 w-1/4 select-none rounded-lg bg-orange/10 py-1 text-center font-primary font-semibold tracking-widest transition-colors duration-300 md:tracking-wide lg:w-1/6 ${
                view === i && "border border-black/30 bg-orange/50 shadow-md"
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
                  blockSize={xs ? 5 : sm ? 6 : 12}
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
            <p className="text-justify font-primary">{developer.description}</p>
          </Article>
        )}
        <article
          className={`flex-col gap-4 ${
            view === "Projects" ? "flex" : "hidden"
          }`}
        >
          <Projects projects={developer.projects} />
        </article>

        <Article>
          {developer.mobs.length > 0 && (
            <TeamMembers mob={developer.mobs[0]!} />
          )}
        </Article>
      </section>
      {session && <Contact developer={developer} />}
    </main>
  );
};

type ArticleProps = {
  title?: string;
  children: ReactNode;
};
const Article = ({ title, children }: ArticleProps) => {
  const [slide, setSlide] = useState(true);
  setTimeout(() => {
    setSlide(false);
  }, 100);
  return (
    <article
      className={`flex flex-col gap-4 transition-all duration-300 ${
        slide ? "translate-y-20 opacity-0" : "translate-x-0 opacity-100"
      }`}
    >
      {title && <h2 className="text-xl font-medium md:text-3xl">{title}</h2>}
      {children}
    </article>
  );
};

export default ShowDeveloper;
