import React from "react";
import Icon from "@/app/assets/icons/Icon";
import { useRouter } from "next/navigation";

type Props = { slug: string | null };
const NextDev = ({ slug }: Props) => {
  const router = useRouter();
  return (
    <button
      className={!!slug ? "block" : "invisible"}
      onClick={() => router.push(`/developer/${slug}`)}
    >
      <Icon icon="nextPerson" className="h-10 fill-black" />
    </button>
  );
};
const PrevDev = ({ slug }: Props) => {
  const router = useRouter();
  return (
    <button
      className={!!slug ? "block" : "invisible"}
      onClick={() => router.push(`/developer/${slug}`)}
    >
      <Icon icon="previousPerson" className="h-10 fill-black" />
    </button>
  );
};

export { NextDev, PrevDev };
