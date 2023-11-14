"use client";
import { type tMail, zMail } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import FormError from "../_components/FormError";
import Button from "../_components/Button";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tMail>({
    resolver: zodResolver(zMail),
  });
  return (
    <main className="flex grow items-center justify-center">
      <div className=" flex relative flex-col justify-center items-center h-[350px] mx-3 w-screen lg:w-2/4 lg:h-[450px] rounded-md shadow-md bg-gray">
      <h2 className=" font-secondary absolute top-10 font-light text-lg lg:text-2xl"> Please Sign in </h2>
        <h3 className=" font-secondary font-light absolute top-20 text-md lg:text-xl"> To get access to our Salties</h3>
      <form
        className="flex max-w-sm flex-col gap-3 "
        onSubmit={(event) =>
          void handleSubmit(async ({ email }) => {
            console.log(email);
            await signIn("email", { email, callbackUrl: "/" });
          })(event)
        }
      >
        <div className="relative mb-2">
          <input
            className="input w-full block border-b-2 border-black/40 bg-transparent p-2 text-sm focus:outline-none"
            id="email"
            {...register("email")}
          />
          <span className="highlight"></span>
          <span className="bar relative block w-52"></span>
          <label
            className="label pointer-events-none absolute left-2 top-1 text-base text-black/40 transition-all duration-500 ease-in-out"
            htmlFor="email"
          >
            Email address
          </label>
          <FormError error={errors.email} />
        </div>
          <Button callToAction>Login</Button>
      </form>
      </div>
    </main>
  );
};

export default LoginPage;
