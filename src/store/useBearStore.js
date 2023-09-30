import { create } from "zustand";

export const useBearStore = create((set, get) => ({
  bears: 0,
  addBears: () => set((state) => ({ bears: state.bears + 1 })),
  removeBears: () => set((state) => ({ bears: state.bears - 1 })),
}));
