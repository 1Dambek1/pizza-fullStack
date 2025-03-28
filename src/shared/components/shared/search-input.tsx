"use client"
import { cn } from "@/lib/utils";
import { api } from "@/src/shared/service/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import {  useState } from "react";
import { useDebounce } from "react-use";

type props = {
  className?: string;
};

export function SearchInput({className}: props) {
  const [query, setQuery] =  useState("");
  const [focused, setFocused] =  useState(false);
  const [products, setProducts] = useState<Product[]>([])
  useDebounce(() => {
    console.log(query)
    api.products.search(query).then((products)=> {
      setProducts(products)
    })
  },
  250,
   [query])
   const onClickItem = () => {
    setFocused(false)
  }
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
            onChange={(e) => setQuery(e.target.value)}
          />
         {products.length > 0 && <div className={cn(
            'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
            focused && 'visible opacity-100 top-12'
          )}>
            {products.map(product =>(
              <Link onClick={onClickItem} replace href={`/product/${product.id}`} key={product.id}  className="flex px-3 py-2 hover:bg-primary/10 items-center gap-2">
                <img src={product.imageURL}  alt={product.name} className="rounded-sm h-8 w-8" />
                <div >{product.name}</div>
              </Link>
            ))}
          </div>}
      </div>
    </>
  );
}