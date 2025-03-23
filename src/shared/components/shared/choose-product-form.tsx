import { cn } from "@/lib/utils";
import { Title } from "./title";
import { Button } from "../ui/button";

type props = {
    imgURL:string;
    name:string;
    price:number;
    onSubmit?: ()=>void;
    loading:boolean;
    className?: string;
};

export function ChooseProductForm({
  className,
  imgURL,
  name,
  price,
  onSubmit,
  loading
}: props) {
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

        <div className="w-[490px] bg-[#f7f6f5] p-7 flex flex-col justify-between items-center">
            <Title text={name} size="md" className="font-extrabold mb-1" />
            <Button
            loading={loading}
            onClick={onSubmit}
            className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                Добавить в корзину за {price} руб.
            </Button>
        </div>

    </div>
  );
}