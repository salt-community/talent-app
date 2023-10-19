import Link from "next/link";
import ContactCard from "@/app/_components/DeveloperContactCard";
import SectionHeader from "@/app/_components/SectionHeader";
import Projects from "@/app/_components/DeveloperProjects";
import Skills from "@/app/_components/DeveloperSkills";
import TeamMembers from "@/app/_components/DeveloperTeamMembers";
import { api } from "@/trpc/server";

const DeveloperPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const developer = await api.developer.getById.query({ id });
  return (
    <div className="flex grow justify-center bg-gradient-to-b from-orange to-pink px-10 ">
      <div className="flex flex-col gap-4 py-6 md:w-[95%] md:flex-row md:py-0">
        {developer && (
          <>
            <div className="rounded-md bg-gray md:w-1/4 md:rounded-none">
              <ContactCard consultant={developer} />
            </div>
            {/* <hr className="h-full border-[1px] border-black/20" /> */}
            <div className="flex flex-col gap-12 rounded-md bg-gray p-4 text-xl md:w-3/4 md:rounded-none md:px-10">
              <section className="flex flex-col gap-4">
                <SectionHeader title={developer.title} />
                <p>{developer.decription}</p>
              </section>
              {/* <Projects project={developer.recentProjects} /> */}
              <Skills skills={developer.skills} />
              {/* <TeamMembers consultants={members} /> */}
            </div>
          </>
        )}
      </div>
      <Link
        href={"/"}
        className="fixed bottom-5 right-5 rounded-md border-2 border-black bg-white p-2 text-black hover:bg-orange hover:text-white"
      >
        go back
      </Link>
    </div>
  );
};

export default DeveloperPage;
