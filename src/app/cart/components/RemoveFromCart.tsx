"use client";
import Icon from "@/app/assets/icons/Icon";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

type Props = { developerId: string };

const RemoveFromCart = ({ developerId }: Props) => {
  const router = useRouter();
  const { mutate: remove, isLoading: removing } = api.cart.remove.useMutation({
    onSuccess: () => router.refresh(),
  });
  return (
    <button disabled={removing} onClick={() => remove({ developerId })}>
      <Icon icon="delete" className="h-8 w-8 hover:scale-125" />
    </button>
  );
};

export default RemoveFromCart;
