import { Filters } from "./use-filter-state"
import qs from "qs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useQueryFilters(filters:Filters) {
  const router = useRouter()
    
  useEffect(()=>{
    const params ={
      ...filters.price,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngridients)
    }
    const query = qs.stringify(params ,{
      arrayFormat: 'comma',
    })
    router.push(`?${query}`, {
      scroll: false,
    })


  },[filters, router])
}