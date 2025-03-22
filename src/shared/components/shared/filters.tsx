"use client"
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckBoxFilterGroup } from "./checkbox-filters-group";
import { useIngidients } from "@/src/shared/hooks/use-ingidients";
import { useFilterState } from "@/src/shared/hooks/use-filter-state";
import { useQueryFilters } from "@/src/shared/hooks/use-query-filters";

type props = {
  className?: string;
};



export function Filters({className}: props) {
  const {items, loading} = useIngidients()
  const filters = useFilterState()
  useQueryFilters(filters)




    return (
    <div className={className}>

      <CheckBoxFilterGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckBox={filters.toggleType}
        selectedIds={filters.pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      <CheckBoxFilterGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckBox={filters.toggleSize}
        selectedIds={filters.sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />
      <div className="mt-5 border-y border-y-neutral-10 py-6 pb-7">
        <p>Цена от и до</p>
      <div className="flex mb-5 gap-3">
        <Input type="number" placeholder="0" min={0} max={1000} value={String(filters.price.priceFrom)} onChange={(e) => filters.UpdatePrice('priceFrom', Number(e.target.value))} />
        <Input type="number" placeholder="1000" min={0} max={1000}  value={String(filters.price.priceTo)} onChange={(e) => filters.UpdatePrice('priceTo', Number(e.target.value))} />
      </div>
      <RangeSlider min={0} max={1000} step={10} value={[filters.price.priceFrom || 0, filters.price.priceTo || 1000]} 
        onValueChange={([priceFrom,priceTo]) => filters.setPrice({priceFrom:priceFrom, priceTo:priceTo})}
      />

      </div>
      <CheckBoxFilterGroup
      title="Ингридиенты"
      className="mt-5"
      limit={5}
      defaultItems={items.slice(0,6)}
      items={items}
      loading={loading}
      onClickCheckBox={filters.toggleIngridient}
      selectedIds={filters.selectedIngridients}
      name="ingridnients"
      />
    </div>
  );
}