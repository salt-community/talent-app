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
      <form
        className="flex max-w-sm flex-col gap-2"
        onSubmit={(event) =>
          void handleSubmit(async ({ email }) => {
            console.log(email);
            await signIn("email", { email, callbackUrl: "/" });
          })(event)
        }
      >
        <label htmlFor="email">Email address</label>
        <input id="email" className="border p-1" {...register("email")} />
        <FormError error={errors.email} />
        <Button callToAction>Login</Button>
      </form>
    </main>
  );
};

export default LoginPage;
