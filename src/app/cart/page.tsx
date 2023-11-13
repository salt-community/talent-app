import { api } from "@/trpc/server";
import ItemContainer from "../_components/ItemContainer";
import Image from "next/image";
import Link from "next/link";
import RemoveFromCart from "./components/RemoveFromCart";

const Cart = async () => {
  const cart = await api.cart.getAll.query();

  return (
    <main className="p-2">
      <h2>Developers</h2>
      <ul>
        {cart.map(({ developerId, image, name }) => (
          <ItemContainer key={developerId} className="justify-between">
            <Link href={`developer/${developerId}`}>
              <div className="flex items-center gap-2">
                <Image
                  alt="developer image"
                  src={image}
                  height={38}
                  width={38}
                />
                <p>{name}</p>
              </div>
            </Link>
            <RemoveFromCart developerId={developerId} />
          </ItemContainer>
        ))}
      </ul>
    </main>
  );
};

export default Cart;
