import React from "react";
import Icon from "@/app/assets/icons/Icon";
import Link from "next/link";

type Props = { slug: string | null };
const NextDev = ({ slug }: Props) => {
  return (
    <Link
      href={`/developer/${slug}`}
      className={!!slug ? "block" : "invisible"}
    >
      <Icon icon="nextPerson" className="h-10 fill-black" />
    </Link>
  );
};
const PrevDev = ({ slug }: Props) => {
  return (
    <Link
      href={`/developer/${slug}`}
      className={!!slug ? "block" : "invisible"}
    >
      <Icon icon="previousPerson" className="h-10 fill-black" />
    </Link>
  );
};

export { NextDev, PrevDev };
