import Image from "next/image";
import { Container } from "./containter";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";

export function Header({className, hasSearch=true, hasCart=true}: {className?:string, hasSearch?:boolean, hasCart?:boolean}) {
  
  return (
    <header className={cn("border border-b", className)}>
        <Container className="flex items-center justify-between py-8">
            <Link href="/">
                <div className="flex gap-4 items-center">
                    <Image src="/logo.png" alt="logo" width={45} height={45} />
                    <div className="">
                        <h1 className="text-2xl uppercase font-black">Denis Pizza</h1>
                        <p className="text-sm text-gray-500 leading-3">The best pizza ever</p>
                    </div>
                </div>
            </Link>
{hasSearch &&            <div className="mx-10 flex-1">
                <SearchInput />
            </div>}
            <div className="flex items-center gap-3">
                <Button variant="outline" className="flex  items-center gap-3">
                    <User size={16} />
                    Log In
                </Button>
{hasCart &&                <div className="">
                    <CartButton/>

                </div>}
            </div>

        </Container>
    </header>
  );
}