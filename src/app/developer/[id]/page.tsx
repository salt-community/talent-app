import Link from "next/link";
import UserCard from "@/app/_components/developer/UserCard";
import SectionHeader from "@/app/_components/SectionHeader";
import Skills from "@/app/_components/developer/DeveloperSkills";
import TeamMembers from "@/app/_components/developer/Team";
import { api } from "@/trpc/server";
import Projects from "@/app/_components/developer/Projects";
import Contact from "@/app/_components/developer/Contact";
import Icon from "@/app/assets/icons/Icon";
import { env } from "@/env.mjs";
import AddToCart from "@/app/_components/developer/AddToCart";
import { getServerAuthSession } from "@/server/auth";
const DeveloperPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const developer = await api.developer.getById.query({ id });
  const session = await getServerAuthSession();
  return (
    <main className="flex grow flex-col justify-center bg-gradient-to-b from-orange to-pink px-5">
      <div className="sticky top-0 flex w-full items-center justify-between">
        <Link href={"/"} className="z-10 w-10">
          <Icon
            icon="arrowLeft"
            className="h-10 rounded-full border border-black/30 bg-black fill-white active:bg-black/30"
          />
        </Link>
        {session && session.user.role === "CLIENT" && (
          <AddToCart developerId={id} />
        )}
      </div>
      <div className="flex grow flex-col gap-4 pb-5 md:flex-row md:py-0">
        <UserCard developer={developer} />
        <div className="flex flex-col gap-5 rounded-md bg-gray p-5 md:w-3/4 md:rounded-none md:px-10">
          <Bio {...developer} />
          {session ? (
            <>
              <Skills skills={developer.skills} />
              <Projects projects={developer.projects} />
              <TeamMembers mobs={developer.mobs} />
            </>
          ) : (
            <div>
              <Link className="underline" href="/login">
                Sign in
              </Link>
              <span className="ml-1">to see more...</span>
            </div>
          )}
        </div>
      </div>
      {env.NEXT_PUBLIC_FF_CONTACT === "ON" && <Contact developer={developer} />}
    </main>
  );
};

type BioProps = { title: string; description: string };
const Bio = ({ title, description }: BioProps) => {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title={title} />
      <p>{description}</p>
    </section>
  );
};

export default DeveloperPage;
