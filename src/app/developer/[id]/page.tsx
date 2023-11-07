import Link from "next/link";
import UserCard from "@/app/_components/developer/UserCard";
import SectionHeader from "@/app/_components/SectionHeader";
import Skills from "@/app/_components/developer/DeveloperSkills";
import TeamMembers from "@/app/_components/developer/Team";
import { api } from "@/trpc/server";
import Projects from "@/app/_components/developer/Projects";
import Contact from "@/app/_components/developer/Contact";
import Icon from "@/app/assets/icons/Icon";

const DeveloperPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const developer = await api.developer.getById.query({ id });
  return (
    <div className="relative flex grow flex-col justify-center bg-gradient-to-b from-orange to-pink px-5">
      <Link href={"/"} className="sticky left-0 top-0 z-10 w-10">
        <Icon
          icon="arrowLeft"
          className="h-10 rounded-full border border-black/30 bg-black fill-white active:bg-black/30"
        />
      </Link>
      <div className="flex flex-col gap-4 pb-5 md:w-[95%] md:flex-row md:py-0">
        <UserCard developer={developer} />
        <div className="flex w-full flex-col gap-5 rounded-md bg-gray p-4 md:w-3/4 md:rounded-none md:px-10">
          <section className="flex flex-col gap-4">
            <SectionHeader title={developer.title} />
            <p>{developer.description}</p>
          </section>
          <hr />
          <Skills skills={developer.skills} />
          <Projects projects={developer.projects} />
          <TeamMembers mobs={developer.mobs} />
        </div>
      </div>
      <Contact developer={developer} />
    </div>
  );
};

export default DeveloperPage;
