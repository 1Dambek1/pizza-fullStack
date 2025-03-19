"use client"
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type props = {
  className?: string;
};

export function SearchInput({className}: props) {
  const [focused, setFocused] =  useState(false);
  return (
    <>
    {focused && 
    <div className="fixed top-0 left-0 bottom-0 w-screen h-screen bg-black/50 z-40" />
    }
      <div className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-50',className)}>
          <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
          <input
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
            type="text"
            placeholder="Найти пиццу..."
          />
          <div className={cn(
            'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
            focused && 'visible opacity-100 top-12'
          )}>
            <Link href={"product/1"}  className="flex px-3 py-2 hover:bg-primary/10 items-center gap-2">
              <img src="https://media.dodostatic.net/image/r:292x292/019591c6455276a4bb8ab7745efd46c1.avif" width={32} height={32} alt="pize1" className="rounded-sm h-8 w-8" />
              <div >Пицца 1</div>
            </Link>
          </div>
      </div>
    </>
  );
}