import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export interface WindowType {
  name: string;
  uuid: string;
  component: React.ReactNode;
  isFullScreen: boolean;
  isShow: boolean;
  zIndex: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

type AppendWindowProps = Pick<WindowType, "component"> & {
  name: string;
  zIndex?: number;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
};

interface WindowStore {
  currentWindows: WindowType[];
  appendWindow: (props: AppendWindowProps) => void;
  removeWindow: (uuid: string) => void;
  setWindowPosition: (uuid: string, position: { x: number; y: number }) => void;
  toggleScreenSize: (uuid: string) => void;
  toggleShowWindow: (uuid: string) => void;
  focusWindow: (uuid: string) => void;
  resizeWindow: (uuid: string, w: number, h: number) => void;
}

export const useWindowStore = create<WindowStore>()(
  devtools((set) => ({
    currentWindows: [],
    appendWindow: (props) => {
      const isExistingWindow = useWindowStore
        .getState()
        .currentWindows.some((window) => window.name === props.name);
      const isMaxSize = useWindowStore.getState().currentWindows.length === 5;

      if (isExistingWindow || isMaxSize) return;
      set(
        (state) => {
          return {
            currentWindows: [
              ...state.currentWindows,
              {
                name: props.name,
                uuid: uuidv4(),
                component: props.component,
                isFullScreen: false,
                isShow: true,
                zIndex: props.zIndex || 1,
                x: props.x || 10,
                y: props.y || 10,
                w: props.w || 1000,
                h: props.h || 600,
              },
            ],
          };
        },
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
    toggleShowWindow: (uuid: string) => {
      set(
        (state) => ({
          currentWindows: state.currentWindows.map((window) => {
            if (window.uuid === uuid) {
              window.isShow = !window.isShow;
            }
            return window;
          }),
        }),
        undefined,
        "[window] show"
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
