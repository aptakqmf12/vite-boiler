import React, { useState, useEffect, RefObject } from "react";

import "@style/Resizer.css";
import { Direction } from ".";
import { useWindowStore } from "@store/window";

interface ResizerProps {
  target: RefObject<any>;
  currX: number;
  currY: number;
  width: number;
  height: number;
  uuid: string;
  setSize: (v: { width: string | number; height: string | number }) => void;
  setPosition: (v: { currX: number; currY: number }) => void;
}

const Resizer = ({
  target,
  currX,
  currY,
  width,
  height,
  uuid,
  setSize,
  setPosition,
}: ResizerProps) => {
  const { resizeWindow } = useWindowStore();
  const [direction, setDirection] = useState("");
  const [mouseDown, setMouseDown] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const onResize = (
    direction: string,
    movementX: number,
    movementY: number
  ) => {
    const panel = target.current;
    if (!panel) return;
    if (typeof width === "string" || typeof height === "string") return;

    switch (direction) {
      case Direction.TopLeft:
        setSize({ width: width - movementX, height: height - movementY });
        setPosition({ currX: currX + movementX, currY: currY + movementY });
        break;

      case Direction.Top:
        setSize({ width: width, height: height - movementY });
        setPosition({ currX: currX, currY: currY + movementY });
        break;

      case Direction.TopRight:
        setSize({ width: width + movementX, height: height - movementY });
        setPosition({ currX: currX, currY: currY + movementY });
        break;

      case Direction.Right:
        setSize({ width: width + movementX, height: height });
        break;

      case Direction.BottomRight:
        setSize({
          width: width + movementX,
          height: height + movementY,
        });

        break;

      case Direction.Bottom:
        setSize({ width: width, height: height + movementY });
        break;

      case Direction.BottomLeft:
        setSize({ width: width - movementX, height: height + movementY });
        setPosition({ currX: currX + movementX, currY: currY });
        break;

      case Direction.Left:
        setSize({ width: width - movementX, height: height });
        setPosition({ currX: currX + movementX, currY: currY });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!direction) return;

      const ratio = window.devicePixelRatio;
      onResize(direction, e.movementX / ratio, e.movementY / ratio);
    };

    if (mouseDown) {
      setIsResizing(true);
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, direction, onResize]);

  useEffect(() => {
    const handleMouseUp = () => {
      setMouseDown(false);
      setIsResizing(false);

      if (isResizing) {
        resizeWindow(uuid, width, height);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [width, height, isResizing]);

  const handleMouseDown = (direction: string) => () => {
    setDirection(direction);
    setMouseDown(true);
  };

  return (
    <>
      <div
        className="top-left"
        onMouseDown={handleMouseDown(Direction.TopLeft)}
      ></div>

      <div className="top" onMouseDown={handleMouseDown(Direction.Top)}></div>

      <div
        className="top-right"
        onMouseDown={handleMouseDown(Direction.TopRight)}
      ></div>

      <div
        className="right"
        onMouseDown={handleMouseDown(Direction.Right)}
      ></div>

      <div
        className="right-bottom"
        onMouseDown={handleMouseDown(Direction.BottomRight)}
      ></div>

      <div
        className="bottom"
        onMouseDown={handleMouseDown(Direction.Bottom)}
      ></div>

      <div
        className="bottom-left"
        onMouseDown={handleMouseDown(Direction.BottomLeft)}
      ></div>

      <div className="left" onMouseDown={handleMouseDown(Direction.Left)}></div>
    </>
  );
};

export default Resizer;
