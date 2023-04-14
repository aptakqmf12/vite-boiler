import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import { Fullscreen, FullscreenExit, Close } from "@mui/icons-material";

import { useWindowStore } from "../../store";
import type { WindowType } from "../../store";

export default function WindowLib(props: WindowType) {
  const windowRef = useRef<Draggable>(null);
  const resize = () => {
    console.log(windowRef.current?.state);
  };
  const {
    removeWindow,
    toggleScreenSize,
    setWindowPosition,
    focusWindow,
    resizeWindow,
  } = useWindowStore();
  const {
    uuid,
    component,
    isFullScreen,
    zIndex = 1,
    x = 0,
    y = 0,
    w = 1000,
    h = 600,
  } = props;
  const isFocused = zIndex === 2;
  // x,y,w,h로 초기화
  const [{ currX, currY }, setPosition] = useState({ currX: x, currY: y });
  const [{ width, height }, setSize] = useState<{
    width: string | number;
    height: string | number;
  }>({ width: w, height: h });
  const [isDragging, setIsDragging] = useState(false);

  const onClose = () => {
    removeWindow(uuid);
  };
  const onFocus = () => {
    if (isFocused) return;
    focusWindow(uuid);
  };
  const onToggleFullScreen = () => toggleScreenSize(uuid);

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
      ref={windowRef}
    >
      <div.wrap
        className={isDragging ? "transparent" : ""}
        style={{ width, height, zIndex }}
        onResize={resize}
      >
        <div.head
          onDoubleClick={onToggleFullScreen}
          isFullScreen={isFullScreen}
          className="handle"
        >
          <div className="title">{uuid}</div>

          <div className="btns">
            <button onClick={onToggleFullScreen}>
              {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
            </button>

            <button onClick={onClose}>
              <Close />
            </button>
          </div>
        </div.head>

        <div.body>{component}</div.body>
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
  `,
};
