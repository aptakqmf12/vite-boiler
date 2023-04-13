import { useState, useEffect, RefObject } from "react";
interface useDragDivProps {
  target: RefObject<HTMLDivElement>;
  handle: RefObject<HTMLDivElement>;
  w?: number;
  h?: number;
}
export default function useResize({ target, handle, w, h }: useDragDivProps) {
  const [size, setSize] = useState<{
    width: number | string;
    height: number | string;
  }>({ width: w || 1000, height: h || 600 });

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

      // // 좌상
      // if (mouseX <= THRESHOLD && mouseY <= THRESHOLD) {
      //   (e.target as HTMLElement).style.cursor = "nw-resize";
      // }
      // // 좌하
      // else if (mouseX <= THRESHOLD && mouseY >= height - THRESHOLD) {
      //   (e.target as HTMLElement).style.cursor = "ne-resize";
      // }
      // // 우상
      // else if (mouseX >= width - THRESHOLD && mouseY <= THRESHOLD) {
      //   (e.target as HTMLElement).style.cursor = "ne-resize";
      // }
      // // 우하
      // else if (mouseX >= width - THRESHOLD && mouseY >= height - THRESHOLD) {
      //   (e.target as HTMLElement).style.cursor = "se-resize";
      // }
      // // 좌우변
      // else if (mouseX <= THRESHOLD || mouseX >= width - THRESHOLD) {
      //   (e.target as HTMLElement).style.cursor = "ew-resize";
      // }
      // // 상하변
      // else if (mouseY <= THRESHOLD || mouseY >= height - THRESHOLD) {
      //   (e.target as HTMLElement).style.cursor = "n-resize";
      // } else if (listsOnPoint.includes(handle.current!!)) {
      //   (e.target as HTMLElement).style.cursor = "move";
      // }
      // // 나머지 경우
      // else {
      //   (e.target as HTMLElement).style.cursor = "default";
      // }
    });
  }, []);
  return { size, setSize };
}
