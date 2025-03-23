import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { IProduct } from "../../@types/prisma-type";
import { useCart } from "../../store/cart";

type props = {
    product:IProduct
  className?: string;
};
 
export function ProductForm({className,product}: props) {
 const stateCart = useCart(state => state)
    
const onSubmit = async (productItemId?:number, ingridientsIds?:number[]) => {
      try{
        if (isPizzaForm){
          await stateCart.addCartItem({
            productItemId:productItemId,
            ingridientsIds:ingridientsIds
          })
        }
        else{
          stateCart.addCartItem({
            productItemId:firstItem.id,
          })
    
        }
        toast.success(product.name + " добавлен(a) в корзину")
      }
      catch(e){
        toast.error("Не удалось добавить товар в корзину")
        console.log(e)
        
      }
    
      
    }
    
  const firstItem = product.items[0]
  const isPizzaForm =Boolean( firstItem.pizzaType)
  return (
    <div className={cn('',className)}>
      <h1>Hello World</h1>
    </div>
  );
}
       