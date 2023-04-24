import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export enum LanguageType {
  KO = "ko",
  EN = "en",
}
interface LanguageStore {
  language: LanguageType;
  changeLanguage: (lang: LanguageType) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  devtools((set) => ({
    language: LanguageType.KO,
    changeLanguage: (lang: LanguageType) => {
      set((state) => ({
        language: lang,
      }));
    },
  }))
);
