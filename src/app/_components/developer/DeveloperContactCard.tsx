import type { FC } from "react";
import Image from "next/image";
import Github from "../../assets/icons/Github";
import { mdilEmail, mdilPhone, mdilMapMarker } from "@mdi/light-js";
import IconTemp from "../../assets/icons/IconTemp";
import LinkedIn from "../../assets/icons/LinkedIn";
import type { RouterOutputs } from "@/trpc/shared";

type Developer = RouterOutputs["developer"]["getById"];

type ContactCardProps = {
  developer: Developer;
};

const ContactCard: FC<ContactCardProps> = ({ developer }) => {
  return (
    <section className="flex flex-col gap-6 p-4 pt-8">
      <div className="flex flex-col items-center gap-2">
        <Image
          className="rounded-full "
          src={developer.image}
          alt="profile picture"
          width={100}
          height={100}
        />
        <h1 className="text-center text-2xl md:text-4xl">{developer.name}</h1>
      </div>
      <div className="flex flex-col gap-4 p-2">
        <div className="flex gap-1">
          <IconTemp path={mdilPhone} />
          <p>{developer.phone}</p>
        </div>
        <div className="flex items-center gap-1">
          <IconTemp path={mdilEmail} />
          <a
            className="text-orange underline"
            href={`mailto: ${developer.mail}`}
          >
            email me
          </a>
        </div>
        <div className="flex items-center gap-1">
          <IconTemp path={mdilMapMarker} />
          <div className="flex flex-wrap gap-1">
            <p>{developer.address}</p>
            <p>{developer.city}</p>
            <p>{developer.country}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <Github url={developer.gitHubUrl} className={"h-10 w-10"} />
        <LinkedIn url={developer.linkedinUrl} className={"h-10 w-10"} />
      </div>
    </section>
  );
};

export default ContactCard;
