"use client";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchDevSchema, type tSearchDevSchema } from "@/utils/zodSchema";
import FormError from "../FormError";
import Icon from "@/app/assets/icons/Icon";

type Props = { onSearch: (search: string) => void };
const SearchForm = ({ onSearch }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<tSearchDevSchema>({ resolver: zodResolver(searchDevSchema) });

  const onSubmit: SubmitHandler<tSearchDevSchema> = ({ search }) => {
    onSearch(search);
  };
  return (
    <form
      className="flex grow gap-2 rounded-md border-2 border-black/50 bg-white md:w-3/5"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <input
        className="min-w-0 grow px-2 outline-none"
        {...register("search")}
        placeholder="Search..."
      />
      <FormError error={errors.search} />
      <button type="submit">
        <Icon
          className="h-8 w-8 fill-black/30 md:hover:fill-black"
          icon="search"
        />
      </button>
    </form>
  );
};

export default SearchForm;
