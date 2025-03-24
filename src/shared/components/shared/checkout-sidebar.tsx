import { ArrowRight, Car, Package, Percent } from "lucide-react";
import { CheckoutItemsDetails } from "./checkout-items-details";
import { WhiteBlock } from "./white-block";
import { Button } from "../ui/button";
import { DEL, DELIVERY } from "../../constants/checkout";
import { Skeleton } from "../ui/skeleton";

type props = {
  totalAmount: number;
  loading:boolean;
  submmiting:boolean;

};

export function CheckoutSideBar({totalAmount, loading,submmiting}: props) {
      const vatPrice = ((totalAmount * DEL) /100)
      const deliveryPrice = DELIVERY
      const totalPrice = totalAmount + vatPrice + deliveryPrice
  return (
    <WhiteBlock className="sticky top-4 p-6">
    <div className="flex flex-col gap-2">
      <span className="text-xl ">Итого:</span>
      {loading ?<Skeleton className="w-28 h-11" /> :<span className="text-4xl font-extrabold "> {totalPrice} ₽</span>}
    </div>


  <CheckoutItemsDetails title={
    <div className="flex items-center">
    <Package className="mr-2 text-gray-400" size={16} />
    Стоимость товаров
    
    </div>
    } value={ loading ? <Skeleton className="w-12 h-7" /> : String(totalAmount)} />
  <CheckoutItemsDetails title={
    <div className="flex items-center">
    <Percent className="mr-2 text-gray-400" size={16} />
    Налоги
    
    </div>
    } value={ loading ? <Skeleton className="w-12 h-7" /> : String(vatPrice)} />
    <CheckoutItemsDetails title={
    <div className="flex items-center">
    <Car className="mr-2 text-gray-400" size={16} />
    Доставка
    
    </div>
    } value={String(deliveryPrice)} />
    <Button
    loading= {loading || submmiting}
    type="submit"
    // disabled ={!totalAmount || submitting}
    className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
      Перейти к оплате
      <ArrowRight className="w-5 ml-2"/>
      </Button> 

  </WhiteBlock>
  );
}