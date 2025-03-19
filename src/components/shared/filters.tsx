"use client"
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckBoxFilterGroup } from "./checkbox-filters-group";
import { useFilterIngridients } from "@/src/hooks/useFilterIngridients";

type props = {
  className?: string;
};

export function Filters({className}: props) {
  const {items} = useFilterIngridients()
  return (
    <div>
      <div className={cn('flex flex-col gap-4',className)}>
          <Title text="Фильтры" size="sm" className="mb-5 font-bold" />
          <FilterCheckbox text="Можно собирать"  value="1" />
          <FilterCheckbox text="Новинки"  value="2" />
      </div>
      <div className="mt-5 border-y border-y-neutral-10 py-6 pb-7">
        <p>Цена от и до</p>
      <div className="flex mb-5 gap-3">
        <Input type="number" placeholder="0" min={0} max={100} defaultValue={0} />
        <Input type="number" placeholder="1000" min={100} max={100}  defaultValue={0} />
      </div>
      <RangeSlider min={0} max={100} step={1} value={[0, 1000]} />

      </div>
      <CheckBoxFilterGroup
      title="Ингридиенты"
      className="mt-5"
      limit={5}
      defaultItems={items.slice(0,6)}
      items={items}
      />
    </div>
  );
}