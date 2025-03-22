import {  useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useMemo, useState } from "react";

interface PriceRange {
  priceFrom?: number;
  priceTo?: number;
}

interface FiltersProps extends PriceRange {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters  {
  sizes: Set<string>
  pizzaTypes: Set<string>
  selectedIngridients: Set<string>
  price: PriceRange
}

interface ReturnProps extends Filters {


  setPrice: (price: PriceRange) => void
  UpdatePrice: (name: keyof PriceRange, value: number) => void

  toggleIngridient: (id:string) => void
  toggleSize: (id:string) => void
  toggleType: (id:string) => void
}

export function useFilterState():ReturnProps {

  const searchParams = useSearchParams() as unknown as Map<keyof FiltersProps, string>

  // фильтр ингридиентов
  const [selectedIngridients, {toggle:toggleIngridient}] = useSet(new Set<string>(searchParams.get("ingredients")?.split(',') || []))


  // фильтр размера пиццы
  const [sizes, {toggle:toggleSize}] = useSet(new Set<string>(searchParams.get("sizes")?.split(',') || []))
  
  // фильтр типа теста пиццы
  const [pizzaTypes, {toggle:toggleType}] = useSet(new Set<string>(searchParams.get("pizzaTypes")?.split(',') || []))
  

  // фильтр по цене 
  const [price, setPrice] = useState<PriceRange>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  })
  
  const UpdatePrice = (name: keyof PriceRange, value: number) => {
      setPrice({
        ...price,
        [name]: value,
      })
    } 
  
  return useMemo(()=>({
    
    sizes,
    pizzaTypes,
    selectedIngridients,
    price,

    setPrice,
    UpdatePrice,
    toggleIngridient,
    toggleSize,
    toggleType,
  }), [sizes, pizzaTypes, selectedIngridients, price])

}