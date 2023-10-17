import type { FC } from "react";
import Image from "next/image";
import Github from "./icons/Github";


import { mdilEmail, mdilPhone, mdilMapMarker } from "@mdi/light-js";
import IconTemp from "./icons/IconTemp";
import LinkedIn from "./icons/LinkedIn";
import { Consultant } from "types";

type ContactCardProps = {
  consultant: Consultant;
};

const ContactCard: FC<ContactCardProps> = ({ consultant }) => {
  return (
    <section className="flex flex-col gap-6 p-4 pt-8">
      <div className="flex flex-col items-center gap-2">
        <Image
          className="rounded-full "
          src={consultant.image}
          alt="profile picture"
          width={100}
          height={100}
        />
        <h1 className="text-center text-2xl md:text-4xl">
          {consultant.firstName} {consultant.lastName}
        </h1>
      </div>
      <div className="flex flex-col gap-4 p-2">
        <div className="flex gap-1">
          <IconTemp path={mdilPhone} />
          <p>{consultant.phone}</p>
        </div>
        <div className="flex items-center gap-1">
          <IconTemp path={mdilEmail} />
          <a
            className="text-orange underline"
            href={`mailto: ${consultant.mail}`}
          >
            email me
          </a>
        </div>
        <div className="flex items-center gap-1">
          <IconTemp path={mdilMapMarker} />
          <div className="flex flex-wrap gap-1">
            <p>{consultant.location.address}</p>
            <p>{consultant.location.city}</p>
            <p>{consultant.location.country}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <Github url={consultant.github} className={"h-10 w-10"} />
        <LinkedIn url={consultant.linkedin} className={"h-10 w-10"} />
      </div>
    </section>
  );
};

export default ContactCard;
