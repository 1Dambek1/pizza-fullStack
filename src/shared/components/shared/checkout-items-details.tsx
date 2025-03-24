import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type props = {
    title:ReactNode
    value:ReactNode
    className?: string;
};

export function CheckoutItemsDetails({className, title, value}: props) {
  return (
            <div className={cn("flex my-4")}>
                <span className="flex flex-1 text-lg text-neutral-500">
                  {title}:
                  <div className="font-bold text-lg" />
                </span>
                <span className="font-bold text-lg flex"> {value} ₽  </span>

            </div>
  );
}