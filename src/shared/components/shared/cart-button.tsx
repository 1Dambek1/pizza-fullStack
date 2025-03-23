"use client"
import { Button } from "../ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { CartDrawer } from "./cart-drawer";
import { useCart } from "../../store/cart";

type props = {
  className?: string;
};

export function CartButton({className}: props) {
  const cartState = useCart(state => state)

  return (
    <CartDrawer>
        <Button loading={cartState.loading} className="group relative">
            <b>{cartState.totalAmount} ₽ </b>
            <span className="h-full w-[1px] bg-white mx-3"/>
            <div className="flex items-center gap-1 duration-300 group-hover:opacity-0">
                <ShoppingCart strokeWidth={2} className="h-4 w-4 relative"/>
                <b>{cartState.items.length}</b>
            </div>
            <ArrowRight
            size={20}
            className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
            />
        </Button>
    </CartDrawer>
  );
}