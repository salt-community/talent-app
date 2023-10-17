import Link from "next/link";

import { CreatePost } from "@/app/_components/create-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Header from "./_components/HeaderComp";
import { Component } from "react";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <>
      <main className="flex grow flex-col items-center">
        <div className="from-orange to-pink flex w-full flex-col items-center bg-gradient-to-b py-20 text-2xl font-bold text-white md:text-5xl">
          <div className="flex flex-col gap-2">
            <p>TOMORROW&apos;S DEVELOPERS.</p>
            <p>AVAILABLE.</p>
            <p>TODAY.</p>
          </div>
        </div>
        <Link
          href={"/search"}
          className="bg-orange mt-20 self-center rounded-xl p-4 text-xl text-white md:text-3xl"
        >
          View developer profiles
        </Link>
      </main>
    </>
  );
}
