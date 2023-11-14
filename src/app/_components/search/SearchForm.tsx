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
      className="mx-auto flex gap-2 rounded-sm bg-white md:w-3/5 lg:w-[400px] "
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <input
        data-cy="searchbar"
        className=" placeholder-gray-400 grow px-2 py-1 outline-none placeholder:translate-x-2 placeholder:font-primary placeholder:text-sm placeholder:font-light"
        {...register("search")}
        placeholder="Search"
      />
      <FormError error={errors.search} />
      <button data-cy="search-submit" type="submit">
        <Icon
          className="h-6 w-8 fill-black/25 hover:fill-orange"
          icon="search"
        />
      </button>
    </form>
  );
};

export default SearchForm;
