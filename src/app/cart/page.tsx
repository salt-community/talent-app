import { api } from "@/trpc/server";
import ItemContainer from "../_components/ItemContainer";
import Image from "next/image";
import Link from "next/link";
import RemoveFromCart from "./components/RemoveFromCart";

const Cart = async () => {
  const cart = await api.cart.getAll.query();

  return (
    <main className="p-2 flex grow flex-col items-center gap-5 bg-gradient-to-b from-orange to-pink pt-5">
      <div className="flex flex-col w-full lg:w-2/3 gap-4 rounded-sm ">
      <h2 className="  p-2 font-light text-2xl text-center lg:text-4xl gap-y-5 ">Your Favorites</h2>
      <ul className="">
        {cart.map(({ developerId, image, name }) => (
          <ItemContainer key={developerId} className="justify-between">
            <Link href={`developer/${developerId}`}>
              <div className="p-1 w-20 flex items-center gap-2">
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
