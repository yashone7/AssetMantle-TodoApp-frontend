import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: {},
  setUser: (userObj) => set((state) => ({ user: userObj })),
}));
