import { Ingredient } from "@prisma/client"
import {  useEffect, useState } from "react"
import { api } from "../service/api-client"
import { FilterChecboxProps } from "../components/shared/filter-checkbox"
import { useSet } from "react-use"
type IngredientType = FilterChecboxProps
interface ReturnProps {
    items: IngredientType[],
    loading:boolean,
    selectedIds: Set<string>
    onAddId: (id:string) => void
}

export function useFilterIngridients():ReturnProps {
    const [items, setItems] = useState<IngredientType[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedIds, {toggle}] = useSet(new Set<string>([]))
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
    return {items, loading, selectedIds, onAddId:toggle}
}