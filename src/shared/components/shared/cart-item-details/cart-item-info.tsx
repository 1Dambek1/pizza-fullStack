import { cn } from "@/lib/utils";
import { mapPizzaType, PizzaSizeType, PizzaTypeType } from "@/src/shared/constants/pizza";
import { Ingredient } from "@prisma/client";

interface Props {
  name: string;
  details:string;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className }) => {

  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      {details && <p className="text-xs text-gray-400 w-[100%]">{details}</p>}
    </div>
  );
};
