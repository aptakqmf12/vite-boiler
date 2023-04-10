import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

/**
 * 일단 mousedown 이벤트에서 잡은 startX를 업데이트해주지 않으니까 dx dy가 너무 커질거같아요
 *
 * 첫 지점을 계속 잡지 않고, move이벤트 발생할 때, 현재 위치랑 이전 이벤트 발생지점의 차이를 옮겨주는 방식으로 예를 들어) 1만큼 계속 움직이면, 계속 +1 +1 +1… 해주면 되겠죠
 * 이전 위치를 기억해야겠죠
 *
 * https://velog.io/@sugar_ghost/javascript%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-mouse%EB%A1%9C-html-%EC%9A%94%EC%86%8C-drag%ED%95%98%EA%B8%B0%EC%BD%94%EB%93%9C-%EC%A0%80%EC%9E%A5%EC%9A%A9
 */

interface WindowProps {
  children: React.ReactNode;
}

export default function WindowCustom({ children }: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(400);

  const [left, setLeft] = useState(100);
  const [top, setTop] = useState(100);

  // const [position, setPosition] = useState<{ left: number; top: number }>({
  //   left: 100,
  //   top: 100,
  // });

  let startX: number = 0;
  let startY: number = 0;

  // drag 로직
  useEffect(() => {
    if (!windowRef.current) return;

    const downEvent = (e: MouseEvent) => {
      // 클릭 시작
      const isHeadClick = document
        .elementsFromPoint(e.clientX, e.clientY)
        .includes(headRef.current!!);
      if (isHeadClick === false) return;

      startX = e.clientX;
      startY = e.clientY;

      // 드래그 시작
      const move = (e: MouseEvent) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        setLeft(left + dx);
        setTop(top + dy);
      };

      // 드래그 종료
      const up = (e: MouseEvent) => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        setLeft(left + dx);
        setTop(top + dy);
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    };

    windowRef.current.addEventListener("mousedown", downEvent);

    return () => {
      windowRef.current?.removeEventListener("mousedown", downEvent);
    };
  }, [windowRef]);

  // resize 로직
  // useEffect(() => {
  //   windowRef.current?.addEventListener("mouseover", (e) => {
  //     const listsOnPoint = document.elementsFromPoint(e.clientX, e.clientY);

  //     const rect = windowRef.current?.getBoundingClientRect();
  //     if (!rect) return;

  //     const mouseX = e.clientX - rect.left;
  //     const mouseY = e.clientY - rect.top;
  //     const width = rect.width;
  //     const height = rect.height;

  //     const THRESHOLD = 5;

  //     // 좌상
  //     if (mouseX <= THRESHOLD && mouseY <= THRESHOLD) {
  //       (e.target as HTMLElement).style.cursor = "nw-resize";
  //     }
  //     // 좌하
  //     else if (mouseX <= THRESHOLD && mouseY >= height - THRESHOLD) {
  //       (e.target as HTMLElement).style.cursor = "ne-resize";
  //     }
  //     // 우상
  //     else if (mouseX >= width - THRESHOLD && mouseY <= THRESHOLD) {
  //       (e.target as HTMLElement).style.cursor = "ne-resize";
  //     }
  //     // 우하
  //     else if (mouseX >= width - THRESHOLD && mouseY >= height - THRESHOLD) {
  //       (e.target as HTMLElement).style.cursor = "se-resize";
  //     }
  //     // 좌우변
  //     else if (mouseX <= THRESHOLD || mouseX >= width - THRESHOLD) {
  //       (e.target as HTMLElement).style.cursor = "ew-resize";
  //     }
  //     // 상하변
  //     else if (mouseY <= THRESHOLD || mouseY >= height - THRESHOLD) {
  //       (e.target as HTMLElement).style.cursor = "n-resize";
  //     }
  //     // 나머지 경우
  //     else {
  //       (e.target as HTMLElement).style.cursor = "default";
  //     }
  //   });
  // }, []);

  const spec = { left, top, width, height };

  return (
    <div.wrap {...spec} ref={windowRef}>
      <div.resize>
        <div.head ref={headRef}></div.head>

        <div.body ref={bodyRef}>{children}</div.body>
      </div.resize>
    </div.wrap>
  );
}

const div = {
  wrap: styled.div<{
    left: number;
    top: number;
    width: number;
    height: number;
  }>`
    position: fixed;
    left: ${(p) => p.left}px;
    top: ${(p) => p.top}px;
    width: ${(p) => p.width}px;
    height: ${(p) => p.height}px;
    padding: 10px;

    border: 1px #000 solid;
    background-color: white;
  `,

  resize: styled.div`
    height: 100%;
  `,

  head: styled.div`
    background-color: #b9b9b9;
    height: 25px;
    cursor: move;
  `,
  body: styled.div`
    background-color: #eee;
    height: calc(100% - 25px);
  `,
};
