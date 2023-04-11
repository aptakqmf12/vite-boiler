import { useState, useEffect, RefObject } from "react";

interface useDragDivProps {
  target: RefObject<HTMLDivElement>;
  handle: RefObject<HTMLDivElement>;
}

export default function useDragDiv({ target, handle }: useDragDivProps) {
  const [left, setLeft] = useState(100);
  const [top, setTop] = useState(100);
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const mouseDown = (e: MouseEvent) => {
      const isHeadClick = document
        .elementsFromPoint(e.clientX, e.clientY)
        .includes(handle.current!!);

      if (isHeadClick === false) return;

      document.getSelection()?.removeAllRanges();

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
    const mouseMove = () => {
      if (!isPressed) return;

      setLeft((left) => left + (currentX - prevX));
      setTop((top) => top + (currentY - prevY));
    };

    window.addEventListener("mousemove", mouseMove);

    return () => window.removeEventListener("mousemove", mouseMove);
  }, [isPressed, currentX, currentY, prevX, prevY]);

  return {
    left,
    top,
  };
}
