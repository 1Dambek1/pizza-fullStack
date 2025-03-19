"use client"
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckBoxFilterGroup } from "./checkbox-filters-group";
import { useFilterIngridients } from "@/src/hooks/useFilterIngridients";
import { useState } from "react";
import { useSet } from "react-use";

type props = {
  className?: string;
};

interface PriceRange {
  priceFrom: number;
  priceTo: number;
}

export function Filters({className}: props) {
  const {items, loading, onAddId, selectedIds} = useFilterIngridients()
  const [sizes, {toggle:toggleSize}] = useSet(new Set<string>([]))


  const [price, setPrice] = useState<PriceRange>({priceFrom:0, priceTo:1000})
  const UpdatePrice = (name: keyof PriceRange, value: number) => {
    setPrice({
      ...price,
      [name]: value,
    })
  } 
  return (
    <div>
      <CheckBoxFilterGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckBox={toggleSize}
        selectedIds={sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />
      <div className="mt-5 border-y border-y-neutral-10 py-6 pb-7">
        <p>Цена от и до</p>
      <div className="flex mb-5 gap-3">
        <Input type="number" placeholder="0" min={0} max={100} value={String(price.priceFrom)} onChange={(e) => UpdatePrice('priceFrom', Number(e.target.value))} />
        <Input type="number" placeholder="1000" min={100} max={100}  value={String(price.priceTo)} onChange={(e) => UpdatePrice('priceTo', Number(e.target.value))} />
      </div>
      <RangeSlider min={0} max={100} step={1} value={[price.priceFrom, price.priceTo]} 
        onValueChange={([priceFrom,priceTo]) => setPrice({priceFrom:priceFrom, priceTo:priceTo})}
      />

      </div>
      <CheckBoxFilterGroup
      title="Ингридиенты"
      className="mt-5"
      limit={5}
      defaultItems={items.slice(0,6)}
      items={items}
      loading={loading}
      onClickCheckBox={onAddId}
      selectedIds={selectedIds}
      name="ingridnients"
      />
    </div>
  );
}