import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cartNumber: 0,

  setCartNumber: (value) => set({ cartNumber: value }),
  totalAmount: 0,
  setTotalAmount: (value) =>
    set({
      totalAmount: value,
    }),
  filteredProducts: [],
  setFilteredProducts: (value) =>
    set((state) => ({
      filteredProducts: [...state.filteredProducts, value],
    })),
  cartState: false,
  setCartState: (value) => set({ cartState: value }),
  allProducts: [],
  setAllProducts: (value) => set({ allProducts: value }),
}));
