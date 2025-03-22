"use client"
import { cn } from "@/lib/utils";
import {  useCategory } from "@/src/shared/store/category";
import { Category } from "@prisma/client";



export function Categories({className, items}:{className?:string, items:Category[]}) {
    const ActiveId = useCategory((state) => state.activeId);
  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
        {
            items.map(({name,id},index) => (
                <a
                href={`#${name}`}
                key = {index}
                className={cn("flex items-center font-bold  h-11 rounded-2xl px-5",
                    ActiveId === id && "bg-white shadow-md shadow-gray-200 text-primary "
                )}
                >
                    <button>{name}</button>
                </a>
            ))
        }
    </div>
  );
}