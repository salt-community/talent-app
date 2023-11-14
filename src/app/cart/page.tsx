import { api } from "@/trpc/server";
import ItemContainer from "../_components/ItemContainer";
import Image from "next/image";
import Link from "next/link";
import RemoveFromCart from "./components/RemoveFromCart";

const Cart = async () => {
  const cart = await api.cart.getAll.query();

  return (
    <main className="flex grow flex-col items-center gap-5 bg-gradient-to-b from-orange to-pink p-2 pt-5">
      <div className="flex w-full flex-col gap-4 rounded-sm lg:w-2/3 ">
        <h2 className="gap-y-5 p-2 text-center text-2xl font-light lg:text-4xl">
          Your Favorites
        </h2>
        <ul className="">
          {cart.map(({ developerId, image, name }) => (
            <ItemContainer key={developerId} className="justify-between">
              <Link href={`developer/${developerId}`}>
                <div className="flex w-20 items-center gap-2 p-1">
                  <Image
                    alt="developer image"
                    src={image}
                    height={256}
                    width={256}
                    className="rounded-full"
                  />
                  <p>{name}</p>
                </div>
              </Link>
              <RemoveFromCart developerId={developerId} />
            </ItemContainer>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Cart;
