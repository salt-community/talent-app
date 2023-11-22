import React from "react";
import parseLocalStorage from "./parseLocalStorage";
import Icon from "@/app/assets/icons/Icon";
import { useRouter } from "next/navigation";

type Props = { currentSlug: string };
const NextDev = ({ currentSlug }: Props) => {
  const router = useRouter();
  const { next } = parseLocalStorage(currentSlug);
  return (
    <button
      className={!!next ? "block" : "invisible"}
      onClick={() => router.push(`/developer/${next}`)}
    >
      <Icon icon="nextPerson" className="h-10 fill-black" />
    </button>
  );
};
const PrevDev = ({ currentSlug }: Props) => {
  const router = useRouter();
  const { prev } = parseLocalStorage(currentSlug);
  return (
    <button
      className={!!prev ? "block" : "invisible"}
      onClick={() => router.push(`/developer/${prev}`)}
    >
      <Icon icon="previousPerson" className="h-10 fill-black" />
    </button>
  );
};

export { NextDev, PrevDev };
