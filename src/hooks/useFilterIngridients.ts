import { Ingredient } from "@prisma/client"
import {  useEffect, useState } from "react"
import { api } from "../service/api-client"
import { FilterChecboxProps } from "../components/shared/filter-checkbox"
type IngredientType = FilterChecboxProps
interface ReturnProps {
    items: IngredientType[]
}

export function useFilterIngridients():ReturnProps {
    const [items, setItems] = useState<IngredientType[]>([])
    useEffect(()=>{
        api.ingridients.getIngridients()
        .then((items:Ingredient[])=>{
            setItems(items.map((item) => ({value:String(item.id), text:item.name}) ))
            })
        .catch((e)=>{
            console.log(e)
        })
    },[])
    return {items}
}