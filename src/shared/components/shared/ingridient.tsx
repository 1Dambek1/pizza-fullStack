import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

type props = {
imgUrl:string;
name:string;
price:number;
active?:boolean;  
onClick?:()=>void;
className?: string;

};

export function IngridientView({
    imgUrl,
    name,
    price,
    active,
    onClick,
    className
}: props) {
  return (
    <div className={cn(
        'flex itemc-center flex-col p-1 rounded-mdw-32 text-center relative cursor-pointer shadow-md bg-white',
        {"border border-primary":active})} 
        onClick={onClick}>
            {active && <CircleCheck className="absolute top-2 right-2 text-primary"/>}
            <img src={imgUrl} width={110} height={110} alt="" />
            <span className="text-xs mb-1">{name}</span>
            <span className="font-bold">
                {price} руб.
            </span>
    </div>
  );
}