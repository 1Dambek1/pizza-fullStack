"use client"
import { cn } from "@/lib/utils";
import {  useCategory } from "@/store/category";
import Link from "next/link";

const categories = [{
    id:1,
    name:"пиццы"
},{
    id:2,
    name:"комбо"
},{
    id:3,
    name:"салоны"
}];
export function Categories({className}:{className?:string}) {
    const ActiveId = useCategory((state) => state.activeId);
  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
        {
            categories.map((item) => (
                <Link
                href={"/#"+item.id}
                key = {item.id}
                className={cn("flex items-center font-bold  h-11 rounded-2xl px-5",
                    ActiveId === item.id && "bg-white shadow-md shadow-gray-200 text-primary "
                )}
                >
                    <button>{item.name}</button>
                </Link>
            ))
        }
    </div>
  );
}