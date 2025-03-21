import { create } from "zustand";

interface State{
    activeId:number;
    setActiveId:(id:number)=>void;
}

export const useCategory = create<State>()((set) => ({
    activeId:1,
    setActiveId:(id:number)=>set({activeId:id})
}))