import { cn } from "@/lib/utils";
import Link from "next/link";
import { Title } from "./title";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type props = {
  id:number,
  name:string,
  price:number,
  imageURL:string,
  className?: string;
};

export function ProductCard({
    id,
    name,
    price,
    imageURL,
    className
}: props) {
  return (
    <div className={cn('',className)} key={id}>
        <Link href={`/product/${id}`}>
            <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                <img src={imageURL} className="h-[215px] w-[215px]" alt="product" />
            </div>
            <Title text={name} size="sm" className=" font-bold" />
            <p className="text-sm text-gray-400">
                Цыпленка с овощами, сыром, молоком и т.д.
            </p>
            <div className="flex justify-between items-centermt-4">
                <span className="text-[20px]">
                    от <b>{price} руб.</b>
                </span>

                <Button variant={"secondary"} className="text-base font-bold ">
                    <Plus size={20} className="mr-1"/>
                </Button>
            </div>
        </Link>
    </div>
  );
}