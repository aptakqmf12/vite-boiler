import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { ReactElement, ReactNode } from "react";

export interface WindowType {
  uuid: string;
  component: React.ReactNode;
  isFullScreen: boolean;

  zIndex?: number;
  savedX?: number;
  savedY?: number;
  width?: number;
  height?: number;
}
interface WindowStore {
  currentWindows: WindowType[];
  appendWindow: (props: Omit<WindowType, "uuid">) => void;
  removeWindow: (uuid: string) => void;
  setSavedPosition: (uuid: string, position: { x: number; y: number }) => void;
  toggleScreenSize: (uuid: string) => void;
  focusWindow: (uuid: string) => void;
}

export const useWindowStore = create<WindowStore>()(
  devtools((set) => ({
    currentWindows: [],
    appendWindow: (props: Omit<WindowType, "uuid">) =>
      set((state) => ({
        currentWindows: [
          ...state.currentWindows,
          {
            uuid: uuidv4(),
            ...props,
          },
        ],
      })),

    removeWindow: (uuid: string) =>
      set((state) => ({
        currentWindows: state.currentWindows.filter(
          (window) => window.uuid !== uuid
        ),
      })),

    setSavedPosition: (uuid: string, position: { x: number; y: number }) =>
      set((state) => ({
        currentWindows: state.currentWindows.map((window) => {
          if (window.uuid === uuid) {
            window.savedX = position.x;
            window.savedY = position.y;
          }
          return window;
        }),
      })),

    toggleScreenSize: (uuid: string) =>
      set((state) => ({
        currentWindows: state.currentWindows.map((window) => {
          if (window.uuid === uuid) {
            window.isFullScreen = !window.isFullScreen;
          }
          return window;
        }),
      })),

    focusWindow: (uuid: string) =>
      set((state) => ({
        currentWindows: state.currentWindows.map((window) => {
          window.zIndex = window.uuid === uuid ? 2 : 1;

          return window;
        }),
      })),
  }))
);
