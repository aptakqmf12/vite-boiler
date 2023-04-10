import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserStore {
  isLogin: boolean;
  setLogin: (b: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        isLogin: false,
        setLogin: () => set((state) => ({ isLogin: !state.isLogin })),
      }),
      {
        name: "user-storage",
      }
    )
  )
);
