import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react"
import { api } from "../service/api-client"
import { FilterChecboxProps } from "../components/shared/filter-checkbox"
type IngredientType = FilterChecboxProps

export function useIngidients() {
  const [items, setItems] = useState<IngredientType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    api.ingridients.getIngridients()
    .then((items:Ingredient[])=>{
        setItems(items.map((item) => ({value:String(item.id), text:item.name}) ))
        })
    .catch((e)=>{
        console.log(e)
    })
    .finally(()=>{
        setLoading(false)
    })
},[])
    
    return {items, loading}
}