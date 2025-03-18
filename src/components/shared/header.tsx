import Image from "next/image";
import { Container } from "./containter";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingCart, User } from "lucide-react";

export function Header({className}:{className?:string}) {
  return (
    <header className={cn("border border-b", className)}>
        <Container className="flex items-center justify-between py-8">
            <div className="flex gap-4 items-center">
                <Image src="/logo.png" alt="logo" width={45} height={45} />
                <div className="">
                    <h1 className="text-2xl uppercase font-black">Denis Pizza</h1>
                    <p className="text-sm text-gray-500 leading-3">The best pizza ever</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button variant="outline" className="flex  items-center gap-3">
                    <User size={16} />
                    Log In
                </Button>
                <div className="">
                    <Button className="group relative">
                        <b>520</b>
                        <span className="h-full w-[1px] bg-white mx-3"/>
                        <div className="flex items-center gap-1 duration-300 group-hover:opacity-0">
                            <ShoppingCart strokeWidth={2} className="h-4 w-4 relative"/>
                            <b>3</b>

                        </div>
                        <ArrowRight
                        size={20}
                        className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                        />
                    </Button>
                </div>
            </div>

        </Container>
    </header>
  );
}