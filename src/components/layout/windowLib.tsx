import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import { Fullscreen, FullscreenExit, Close } from "@mui/icons-material";

import { useWindowStore } from "../../store";
import type { WindowType } from "../../store";

// x,y : move시 좌표
// savedX,Y : zustand에 저장될 좌표
export default function WindowLib(props: WindowType) {
  const { removeWindow, toggleScreenSize, setSavedPosition, focusWindow } =
    useWindowStore();
  const { uuid, component, zIndex = 1, isFullScreen, savedX, savedY } = props;

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({
    currX: savedX || 0,
    currY: savedY || 0,
  });
  const [size, setSize] = useState<{
    width: string | number;
    height: string | number;
  }>({ width: 1000, height: 600 });
  const [{ currX, currY }, { width, height }] = [position, size];

  const onClose = () => removeWindow(uuid);
  const onFocus = () => focusWindow(uuid);
  const onToggleFullScreen = () => toggleScreenSize(uuid);

  useEffect(() => {
    if (isFullScreen) {
      setPosition({ currX: 0, currY: 0 });
      setSize({ width: "100vw", height: "100vh" });
    } else {
      setPosition({ currX: savedX || 0, currY: savedY || 0 });
      setSize({ width: 1000, height: 600 });
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
      onMouseDown={() => onFocus()}
      onDrag={(_, data) => {
        setIsDragging(true);
        setPosition({ currX: data.x, currY: data.y });
      }}
      onStop={(_, data) => {
        setSavedPosition(uuid, { x: data.x, y: data.y });
        setIsDragging(false);
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
        onClick={onFocus}
      >
        <div.head
          onDoubleClick={onToggleFullScreen}
          isFullScreen={isFullScreen}
          className="handle"
        >
          <div className="title">{String(isFullScreen)}Risk Zero 3.0</div>

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
