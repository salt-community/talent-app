import Link from "next/link";
import ContactCard from "@/app/_components/developer/DeveloperContactCard";
import SectionHeader from "@/app/_components/SectionHeader";
import Skills from "@/app/_components/developer/DeveloperSkills";
import TeamMembers from "@/app/_components/developer/DeveloperTeamMembers";
import { api } from "@/trpc/server";
import ProjectSlider from "@/app/_components/developer/ProjectSlider";

const DeveloperPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const developer = await api.developer.getById.query({ id });
  return (
    <div className="flex grow justify-center bg-gradient-to-b from-orange to-pink px-10 ">
      <div className="flex flex-col gap-4 py-6 md:w-[95%] md:flex-row md:py-0">
        <ContactCard developer={developer} />
        <div className="flex flex-col gap-12 rounded-md bg-gray p-4 text-xl md:w-3/4 md:rounded-none md:px-10">
          <section className="flex flex-col gap-4">
            <SectionHeader title={developer.title} />
            <p>{developer.description}</p>
          </section>
          <ProjectSlider projects={developer.projects} />
          <Skills skills={developer.skills} />
          {developer.mobs.map(
            (mob) => mob && <TeamMembers key={mob.id} mob={mob} />,
          )}
        </div>
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
