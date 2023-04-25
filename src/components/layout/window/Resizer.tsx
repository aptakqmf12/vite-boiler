import React, { useState, useEffect } from "react";

import "@style/Resizer.css";
import { Direction } from "./window";
import { useWindowStore } from "@store/window";

interface ResizerProps {
  onResize: any;
  width: number;
  height: number;
  uuid: string;
}

const Resizer = ({ onResize, width, height, uuid }: ResizerProps) => {
  const { resizeWindow } = useWindowStore();
  const [direction, setDirection] = useState("");
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!direction) return;

      const ratio = window.devicePixelRatio;

      onResize(direction, e.movementX / ratio, e.movementY / ratio);
    };

    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, direction, onResize]);

  useEffect(() => {
    const handleMouseUp = () => {
      setMouseDown(false);
      // resizeWindow(uuid, width, height);
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [width, height]);

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
