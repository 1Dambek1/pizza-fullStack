"use client"
import { cn } from "@/lib/utils";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";
import { Skeleton } from "../ui/skeleton";

type Item = FilterChecboxProps
type props = {
  title:string,
  items:Item[],
  defaultItems:Item[],
  loading?:boolean,
  limit?:number,
  selectedIds?:Set<string>,
  searchInputPlaceholder?:string,
  onClickCheckBox?:(id:string)=>void,
  defaultValue?:string[],
  className?: string;
  name?:string
};

export function CheckBoxFilterGroup({
  title,
  items,
  defaultItems,
  limit=5,
  selectedIds,
  loading,
  onClickCheckBox,
  searchInputPlaceholder = "Поиск...",
  className,
  name
}: props) {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState(""); 
  const list = showAll ? items.filter((item)=> item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) : defaultItems.slice(0, limit);

  const OnInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }
  if(loading){
    return <div className={cn('',className)}>
        <p className="font-bold mb-3 ">{title}</p>
        {
          ...new Array(limit).fill(0).map((_,index)=>(
            <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
          ))
        }

      </div>
  }

  return (
    <div className={cn('',className)}>
      <p className="font-bold mb-3">{title}</p>
{showAll &&      
      <div className="mb-5">
        <Input onChange={OnInputChange} placeholder={searchInputPlaceholder} className="border-none " />
      </div>}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
{list.map((item,index)=>(
  <FilterCheckbox
  key={index}
  text = {item.text}
  value = {item.value}
  endAdornment = {item.endAdornment}
  checked={selectedIds?.has(item.value)}
  onCheckedChange={()=> onClickCheckBox?.(item.value)}
  name={name}

  />
))        }
      </div>
      {items.length>limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
            <button onClick={() => {
              setShowAll((prev) => !prev)
              setSearchValue("")
              }} className="text-primary mt-3">
              {showAll ? "Скрыть" : "Показать все"}
            </button>
        </div>
      )}
    </div>
  );
}