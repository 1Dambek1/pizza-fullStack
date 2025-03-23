import { create } from "zustand"; 
import { api } from "../service/api-client";
import { CartStateItem, getCartDetails } from "@/lib/get-cart-details";
import { CreateCartItemValues } from "@/src/dto/cart.dto";

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];
  
    /* Получение товаров из корзины */
    fetchCartItems: () => Promise<void>;
  
    /* Запрос на обновление количества товара */
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  
    /* Запрос на добавление товара в корзину */
    addCartItem: (values: any) => Promise<void>;
  
    /* Запрос на удаление товара из корзины */
    removeCartItem: (id: number) => Promise<void>;
  }
  
  export const useCart = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,
  
    fetchCartItems: async () => {
      try {
        set({ loading: true, error: false });
        const data = await api.cart.getCart();
        
        set( getCartDetails(data));
      } catch (error) {
        console.error(error);
        set({ error: true });
      } finally {
        set({ loading: false });
      }
    },
  
    updateItemQuantity: async (id: number, quantity: number) => {
      try {
        set({ loading: true, error: false });
        const data = await api.cart.updateItemQuantity(id, quantity);
        set(getCartDetails(data));
      } catch (error) {
        console.error(error);
        set({ error: true });
      } finally {
        set({ loading: false });
      }
    },
  
    removeCartItem: async (id: number) => {
      try {
        set((state) => ({
          loading: true,
          error: false,
          items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
        }));
        const data = await api.cart.removeCartItem(id);
        set(getCartDetails(data));
      } catch (error) {
        console.error(error);
        set({ error: true });
      } finally {
        set((state) => ({
          loading: false,
          items: state.items.map((item) => ({ ...item, disabled: false })),
        }));
      }
    },
  
    addCartItem: async (values: CreateCartItemValues) => {
      try {
        set({ loading: true, error: false });
        const data = await api.cart.addCartItem(values);
        set(getCartDetails(data));
      } catch (error) {
        console.error(error);
        set({ error: true });
      } finally {
        set({ loading: false });
      }
    },
  }));
  