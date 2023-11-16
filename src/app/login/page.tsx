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
    watch,
  } = useForm<tMail>({
    resolver: zodResolver(zMail),
  });
  const watchInput = watch("email");
  return (
    <main className="flex grow items-center justify-center">
      <div className=" relative flex h-[350px] w-screen flex-col items-center justify-center rounded-md bg-gray shadow-md lg:h-[450px] lg:w-2/4">
        <h2 className=" absolute top-10 font-secondary text-lg font-light lg:text-2xl">
          Please Sign in
        </h2>
        <h3 className="text-md absolute top-20 font-secondary font-light lg:text-xl">
          To get access to our Salties
        </h3>
        <form
          className="flex max-w-sm w-3/4 md:1/2 flex-col gap-4"
          onSubmit={(event) =>
            void handleSubmit(async ({ email }) => {
              await signIn("email", { email, callbackUrl: "/" });
            })(event)
          }
        >
          <div className="relative">
            <input
              className="peer w-full border-b-2 border-black/40 bg-transparent p-2 text-sm outline-none"
              id="email"
              {...register("email")}
            />
            <span className="absolute bottom-0 left-0 block h-[2px] w-0 transition-[width] duration-500 peer-focus:w-1/2 peer-focus:bg-orange"></span>
            <span className="absolute bottom-0 right-0 block h-[2px] w-0 transition-[width] duration-500 peer-focus:w-1/2 peer-focus:bg-orange"></span>
            <label
              className={`pointer-events-none absolute left-2 top-1 text-base text-black/40 transition-all duration-500 ease-in-out peer-focus:-translate-y-5 peer-focus:scale-110 peer-focus:text-orange ${
                watchInput &&
                watchInput.length !== 0 &&
                "-translate-y-5 scale-110 text-orange"
              }`}
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
