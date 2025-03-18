"use client"
import { cn } from "@/lib/utils";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";

type Item = FilterChecboxProps
type props = {
  title:string,
  items:Item[],
  defaultItems:Item[],
  limit?:number,
  searchInputPlaceholder?:string,
  onChange?:(values:string[])=>void,
  defaultValue?:string[],
  className?: string;
};

export function CheckBoxFilterGroup({
  title,
  items,
  defaultItems,
  limit =5,
  searchInputPlaceholder = "Поиск...",
  className,
}: props) {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState(""); 
  const list = showAll ? items.filter((item)=> item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) : defaultItems.slice(0, limit);

  const OnInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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
  checked={false}
  onCheckedChange={(ids)=> console.log(ids)}

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