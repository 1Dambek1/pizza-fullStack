import { cn } from "@/lib/utils";
import { Title } from "./title";
import { Button } from "../ui/button";

type props = {
    imgURL:string;
    name:string;
    onclickAddToCart:()=>void;
    className?: string;
};

export function ChooseProductForm({
  className,
  imgURL,
  name,
  onclickAddToCart
}: props) {
    const totalPrice = 400
    const textDetails = "Цыпленка с овощами, сыром, молоком и т.д."
  return (
    <div className={cn('flex flex-1',className)}>
          <div className={cn('relative flex items-center justify-center flex-1 w-full',className)}>

                    <img 
                    src={imgURL} 
                    alt="logo"
                    className={cn("relative w-[350px] h-[350px] left-2 top-2 transition-all z-10 duration-300",{

                    })} 
                    />

      </div>

        <div className="w-[490px] bg-[#f7f6f5] p-7">
            <Title text={name} size="md" className="font-extrabold mb-1" />
            <p className="text-gray-400"> {textDetails}</p>
            <Button
            className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                Добавить в корзину за {totalPrice} руб.
            </Button>
        </div>

    </div>
  );
}