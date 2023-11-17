"use client";
import Button from "@/app/_components/Button";
import { api } from "@/trpc/react";
import { type tMobSchema, mobSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = { id: string; slug: string };
const SlugForm = ({ id, slug }: Props) => {
  const utils = api.useContext();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitSuccessful },
    register,
    reset,
  } = useForm<tMobSchema>({
    defaultValues: { name: slug },
    resolver: zodResolver(mobSchema),
  });
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({}, { keepValues: true });
    }
  }, [isSubmitSuccessful, reset]);
  const { mutate: update } = api.developer.updateSlug.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: async () => {
      toast.success("Changed slug successfully!");
      await utils.developer.getById.invalidate();
    },
  });
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) =>
        void handleSubmit(({ name }) => update({ id, slug: name }))(e)
      }
    >
      <label className="pt-2 font-semibold" htmlFor={"slug-input"}>
        Slug
      </label>
      <input
        id="slug-input"
        className="h-10 rounded-md border-2 border-black/50 bg-black/10 px-2"
        {...register("name")}
      />
      {isDirty && <Button callToAction>Validate slug</Button>}
    </form>
  );
};

export default SlugForm;
