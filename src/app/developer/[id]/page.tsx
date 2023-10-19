
import { getUser } from "@/server/server-actions";

import Link from "next/link";
import ContactCard from "@/app/_components/DeveloperContactCard";
import SectionHeader from "@/app/_components/SectionHeader";
import Projects from "@/app/_components/DeveloperProjects";
import Skills from "@/app/_components/DeveloperSkills";
import TeamMembers from "@/app/_components/DeveloperTeamMembers";

const Developer = async ({ params: { id } }: { params: { id: string } }) => {
  const consultant = await getUser(id);
  const members = await Promise.all(consultant.teamMembers.map((id) => getUser(id)))
  return (
    <div className="from-orange to-pink flex grow justify-center bg-gradient-to-b px-10 ">
      <div className="flex flex-col gap-4 py-6 md:w-[95%] md:flex-row md:py-0">
        {consultant && (
          <>
            <div className="bg-gray rounded-md md:w-1/4 md:rounded-none">
              <ContactCard consultant={consultant} />
            </div>
            {/* <hr className="h-full border-[1px] border-black/20" /> */}
            <div className="bg-gray flex flex-col gap-12 rounded-md p-4 text-xl md:w-3/4 md:rounded-none md:px-10">
              <section className="flex flex-col gap-4">
                <SectionHeader title={consultant.title} />
                <p>{consultant.decription}</p>
              </section>
              <Projects project={consultant.recentProjects[0]!} />
              <Skills skills={consultant.skills} />
              <TeamMembers consultants={members} />
            </div>
          </>
        )}
      </div>
      <Link
        href={"/"}
        className="hover:bg-orange fixed bottom-5 right-5 rounded-md border-2 border-black bg-white p-2 text-black hover:text-white"
      >
        go back
      </Link>
    </div>
  );
};

export default Developer;
