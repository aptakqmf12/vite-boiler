import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface LoginStore {
  isLogin: boolean;
  setLogin: (bool: boolean) => void;
}

export const useLoginStore = create<LoginStore>()(
  devtools((set) => ({
    isLogin: false,
    setLogin: (bool: boolean) => {
      set(
        (state) => ({
          isLogin: bool,
        }),
        undefined,
        "[Login] setLogin"
      );
    },
  }))
);
