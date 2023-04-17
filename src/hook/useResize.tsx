import { useState, useEffect, RefObject } from "react";
interface useDragDivProps {
  target: RefObject<HTMLDivElement>;
  handle: RefObject<HTMLDivElement>;
  w?: number;
  h?: number;
}
export default function useResize({ target, handle, w, h }: useDragDivProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [readyResize, setReadyResize] = useState(false);
  const [reSize, setReSize] = useState<{
    width: number | string;
    height: number | string;
  }>({ width: w || 1000, height: h || 600 });

  useEffect(() => {
    const mousedown = () => {
      setIsPressed(true);
    };
    const mouseup = () => {
      setIsPressed(false);
    };

    window.addEventListener("mousedown", mousedown);
    window.addEventListener("mouseup", mouseup);

    return () => {
      window.removeEventListener("mousedown", mousedown);
      window.removeEventListener("mouseup", mouseup);
    };
  }, []);

  useEffect(() => {
    target.current?.addEventListener("mouseover", (e) => {
      const listsOnPoint = document.elementsFromPoint(e.clientX, e.clientY);

      const rect = target.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;

      const THRESHOLD = 5;

      // 좌하
      if (mouseX <= THRESHOLD && mouseY >= height - THRESHOLD) {
        (e.target as HTMLElement).style.cursor = "ne-resize";
      }
      // 우하
      if (mouseX >= width - THRESHOLD && mouseY >= height - THRESHOLD) {
        (e.target as HTMLElement).style.cursor = "se-resize";
      }
      // 좌우
      else if (mouseX <= THRESHOLD || mouseX >= width - THRESHOLD) {
        (e.target as HTMLElement).style.cursor = "ew-resize";
      }
      // 하
      else if (mouseY >= height - THRESHOLD) {
        (e.target as HTMLElement).style.cursor = "n-resize";
      }
      // move
      else if (listsOnPoint.includes(handle.current!!)) {
        (e.target as HTMLElement).style.cursor = "move";
      }
      // 나머지 경우
      else {
        (e.target as HTMLElement).style.cursor = "default";
      }
    });
  }, []);
  return { reSize, setReSize, isPressed };
}
