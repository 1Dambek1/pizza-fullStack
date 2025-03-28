"use client"
import { cn } from "@/lib/utils";

import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";
interface props extends CartItemProps {
    onClickCountButton:(type :"minus" | "plus")=>void;
    onClickRemoveItem:()=>void;
    className?: string;
};

export function CartDrawerItem({
    id,
    imageUrl,
    name,
    price,
    quantity,
    details,
    disabled,
    className,
    onClickCountButton,
    onClickRemoveItem

}: props) {
  return (
    <div className={cn('flex bg-white p-5 gap-6',{
        'opacity-50 pointer-events-none' : disabled
    })}>
        <CartItem.Image src={imageUrl} />
        <div className="flex-1">
            <CartItem.Info name={name} details={details}  />
            <hr className="my-3" />

            <div className="flex justify-between items-center">
                <CountButton onClick={onClickCountButton} value={quantity} size="sm" />
                <div className="flex  items-center gap-3">
                    <CartItem.Price value={price} />
                    <Trash2Icon
                    className="text-gray-400 cursor-pointer hover:text-gray-600 "
                    size={16}
                    onClick={onClickRemoveItem}
                    />
                </div>
            </div>
        </div>
    </div>
  );
}