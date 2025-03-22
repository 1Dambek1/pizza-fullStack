import { useEffect, useState } from "react"
import { Variant } from "../components/shared/group-variants"
import { PizzaSizeType, PizzaTypeType } from "../constants/pizza"
import { useSet } from "react-use";
import { ProductItem } from "@prisma/client";
import { getAvailablePizza } from "@/lib/get-available-pizza";

interface ReturnProps{
    pizzaType:PizzaTypeType;
    size:PizzaSizeType;
    setPizzaType:(type:PizzaTypeType)=>void;
    setSize:(size:PizzaSizeType)=>void;
    selectedIngridients:Set<number>;
    addIngridient:(ingridient:number)=>void;
    availablePizza:Variant[];
}


export function usePizzaOptions(items:ProductItem[]):ReturnProps {
    const [pizzaType, setPizzaType] = useState<PizzaTypeType>(1)
    const [size, setSize] = useState<PizzaSizeType>(20)
    const [selectedIngridients, {toggle:addIngridient}] = useSet(new Set<number>([]))
    const availablePizza = getAvailablePizza(pizzaType, size, items)
    
    useEffect(()=>{
    
        if(availablePizza.find((item)=> item.disabled && Number(item.value) === size)){
          
        const availbleSize = availablePizza?.find((item) => !item.disabled)
        console.log(availbleSize)
        
        if (availbleSize){
          setSize(Number(availbleSize.value) as PizzaSizeType)
      }
    
    
    }
      },[pizzaType])
    return {pizzaType, size, setPizzaType, setSize,selectedIngridients,addIngridient,availablePizza}
}