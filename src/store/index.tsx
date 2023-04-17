import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { ReactElement, ReactNode } from "react";

export interface WindowType {
  uuid: string;
  component: React.ReactNode;
  isFullScreen: boolean;
  zIndex?: number;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}
interface WindowStore {
  currentWindows: WindowType[];
  appendWindow: (props: Omit<WindowType, "uuid">) => void;
  removeWindow: (uuid: string) => void;
  setWindowPosition: (uuid: string, position: { x: number; y: number }) => void;
  toggleScreenSize: (uuid: string) => void;
  focusWindow: (uuid: string) => void;
  resizeWindow: (uuid: string, w: number, h: number) => void;
}

export const useWindowStore = create<WindowStore>()(
  devtools((set) => ({
    currentWindows: [],
    appendWindow: (props: Omit<WindowType, "uuid">) => {
      set(
        (state) => ({
          currentWindows: [
            ...state.currentWindows,
            {
              uuid: uuidv4(),
              ...props,
            },
          ],
        }),
        undefined,
        "[window] add"
      );
    },
    removeWindow: (uuid: string) => {
      set(
        (state) => ({
          currentWindows: state.currentWindows.filter(
            (window) => window.uuid !== uuid
          ),
        }),
        undefined,
        "[window] remove"
      );
    },
    setWindowPosition: (uuid: string, position: { x: number; y: number }) => {
      set(
        (state) => ({
          currentWindows: state.currentWindows.map((window) => {
            if (window.uuid === uuid) {
              window.x = position.x;
              window.y = position.y;
            }
            return window;
          }),
        }),
        undefined,
        "[window] position"
      );
    },
    toggleScreenSize: (uuid: string) => {
      set(
        (state) => ({
          currentWindows: state.currentWindows.map((window) => {
            if (window.uuid === uuid) {
              window.isFullScreen = !window.isFullScreen;
            }
            return window;
          }),
        }),
        undefined,
        "[window] screenSize"
      );
    },
    focusWindow: (uuid: string) => {
      set(
        (state) => ({
          currentWindows: state.currentWindows.map((window) => {
            window.zIndex = window.uuid === uuid ? 2 : 1;

            return window;
          }),
        }),
        undefined,
        "[window] focusOn"
      );
    },
    resizeWindow: (uuid: string, w: number, h: number) => {
      set(
        (state) => ({
          currentWindows: state.currentWindows.map((window) => {
            if (window.uuid === uuid) {
              window.w = w;
              window.h = h;
            }
            return window;
          }),
        }),
        undefined,
        "[window] resize"
      );
    },
  }))
);
