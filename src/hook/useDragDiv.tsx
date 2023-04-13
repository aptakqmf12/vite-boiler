import { useState, useEffect, RefObject } from "react";

interface useDragDivProps {
  target: RefObject<HTMLDivElement>;
  handle: RefObject<HTMLDivElement>;
  isFullScreen: boolean;
}

export default function useDragDiv({
  target,
  handle,
  isFullScreen,
}: useDragDivProps) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const mouseDown = (e: MouseEvent) => {
      e.preventDefault();
      document.getSelection()?.removeAllRanges();

      const isHeadClick = document
        .elementsFromPoint(e.clientX, e.clientY)
        .includes(handle.current!!);
      if (!isHeadClick) return;

      setIsPressed(true);
    };
    const mouseUp = (e: MouseEvent) => {
      setIsPressed(false);
    };

    target.current?.addEventListener("mousedown", mouseDown);
    target.current?.addEventListener("mouseup", mouseUp);
    return () => {
      target.current?.removeEventListener("mousedown", mouseDown);
      target.current?.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setPrevX(currentX);
      setPrevY(currentY);
      setCurrentX(e.clientX);
      setCurrentY(e.clientY);
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [currentX, currentY]);

  useEffect(() => {
    if (isPressed) {
      setCurrentX(currentX);
      setCurrentY(currentY);
    }
  }, [isPressed, currentX, currentY]);

  useEffect(() => {
    if (isFullScreen) return;

    const mouseMove = () => {
      if (!isPressed) return;

      // 마우스 아웃시 예외처리
      if (position.x < 0) {
        setPosition((position) => ({
          x: 1,
          y: position.y + (currentY - prevY),
        }));
      }
      if (position.y < 0) {
        setPosition((position) => ({
          x: position.x + (currentX - prevX),
          y: 1,
        }));
      }

      setPosition((position) => ({
        x: position.x + (currentX - prevX),
        y: position.y + (currentY - prevY),
      }));
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [isPressed, currentX, currentY, prevX, prevY]);

  return {
    position,
    setPosition,
  };
}
