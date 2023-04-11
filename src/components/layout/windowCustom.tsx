import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useDragDiv from "../../hook/useDragDiv";

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

  // drag 로직
  const { left, top } = useDragDiv({
    target: windowRef,
    handle: headRef,
  });

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
  //     } else if (listsOnPoint.includes(headRef.current!!)) {
  //       (e.target as HTMLElement).style.cursor = "move";
  //     }
  //     // 나머지 경우
  //     else {
  //       (e.target as HTMLElement).style.cursor = "default";
  //     }
  //   });
  // }, []);

  return (
    <div.wrap style={{ left, top, width, height }} ref={windowRef}>
      <div.resize>
        <div.head ref={headRef}></div.head>

        <div.body ref={bodyRef}>{children}</div.body>
      </div.resize>
    </div.wrap>
  );
}

const div = {
  wrap: styled.div`
    position: fixed;

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
