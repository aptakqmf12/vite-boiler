import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import { Menu, MenuItem, Avatar } from "@mui/material";
import {
  Fullscreen,
  FullscreenExit,
  Close,
  Remove,
  Settings,
} from "@mui/icons-material";
import { useWindowStore } from "../../store";
import type { WindowType } from "../../store";

import useResize from "../../hook/useResize";

export type SizeType = {
  width: string | number;
  height: string | number;
};

export default function WindowLib(props: WindowType) {
  const windowRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const {
    removeWindow,
    toggleScreenSize,
    setWindowPosition,
    focusWindow,
    toggleShowWindow,
  } = useWindowStore();
  const { uuid, component, isFullScreen, isShow, zIndex, x, y, w, h } = props;
  const isFocused = zIndex === 2;

  const [menu, setMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [{ currX, currY }, setPosition] = useState({ currX: x, currY: y });
  const [{ width, height }, setSize] = useState<SizeType>({
    width: w,
    height: h,
  });

  const onClose = () => removeWindow(uuid);

  const onFocus = () => {
    if (isFocused) return;
    focusWindow(uuid);
  };
  const onToggleFullScreen = () => toggleScreenSize(uuid);
  const onHide = () => toggleShowWindow(uuid, false);

  useEffect(() => {
    if (isFullScreen) {
      setPosition({ currX: 0, currY: 0 });
      setSize({ width: "100vw", height: "100vh" });
    } else {
      setPosition({ currX: x, currY: y });
      setSize({ width: w, height: h });
    }
  }, [isFullScreen]);

  const THRESHOLD = 30;
  const bounds = {
    left: (width as number) * -1 + THRESHOLD,
    top: -10,
    right: window.innerWidth - THRESHOLD,
    bottom: window.innerHeight - THRESHOLD,
  };

  // 리사이즈
  // const { isPressed } = useResize({
  //   target: windowRef,
  //   side: resizeRef,
  //   setSize: setSize,
  // });

  if (isShow === false) return <></>;

  return (
    <Draggable
      onMouseDown={onFocus}
      onDrag={(_, data) => {
        setIsDragging(true);
        setPosition({ currX: data.x, currY: data.y });
      }}
      onStop={(_, data) => {
        setIsDragging(false);
        if (!isDragging) return;
        setWindowPosition(uuid, { x: data.x, y: data.y });
      }}
      disabled={isFullScreen}
      bounds={bounds}
      handle={".handle"}
      defaultPosition={{ x: 0, y: 0 }}
      position={{ x: currX, y: currY }}
    >
      <div.wrap
        className={isDragging ? "transparent" : ""}
        style={{ width, height, zIndex }}
        ref={windowRef}
      >
        <div.head
          onDoubleClick={onToggleFullScreen}
          isFullScreen={isFullScreen}
          className="handle"
          ref={handleRef}
        >
          <div className="title">{uuid}</div>

          <div className="btns">
            <button onClick={() => setMenu(true)}>
              <Settings />
            </button>

            <button onClick={onHide}>
              <Remove />
            </button>
            <button onClick={onToggleFullScreen}>
              {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
            </button>

            <button onClick={onClose}>
              <Close />
            </button>
          </div>
        </div.head>

        <div.body>{component}</div.body>

        <div.side ref={resizeRef}></div.side>
      </div.wrap>
    </Draggable>
  );
}

const div = {
  wrap: styled.div`
    position: fixed;
    left: 0;
    top: 0;
    color: black;
    margin: auto;
    user-select: none;
    background: #ffffff;
    border: 1px #000 solid;
    background-color: white;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    border: 1px gray solid;

    &.transparent {
      opacity: 0.6;
    }
  `,
  head: styled.div<{ isFullScreen: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    padding: 0 5px;
    box-sizing: border-wrap;
    background-color: #e2e2e2;
    cursor: ${(p) => (p.isFullScreen ? "default" : "move")};

    .title {
    }
    .btns {
      display: flex;
      gap: 2px;
    }
  `,

  body: styled.div`
    background-color: #ffffff;
    height: calc(100% - 30px);
    overflow: auto;
  `,

  side: styled.div`
    position: absolute;
    right: -2px;
    bottom: -2px;
    width: 10px;
    height: 10px;
    border: 1px black dashed;
    cursor: se-resize;
  `,
};
