import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useDragDiv from "../../hook/useDragDiv";
import { Fullscreen, FullscreenExit, Close } from "@mui/icons-material";

interface WindowProps {
  children: React.ReactNode;
}

export default function Window({ children }: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [display, setDisplay] = useState<boolean>(true);

  // drag 로직
  const { position, setPosition } = useDragDiv({
    target: windowRef,
    handle: headRef,
    isFullScreen,
  });

  // resize 로직
  const [size, setSize] = useState<{
    width: number | string;
    height: number | string;
  }>({ width: 1000, height: 600 });

  // const { size, setSize } = useResize({
  //   target: windowRef,
  //   handle: headRef,
  // });

  // fullScreen 로직
  const fullScreen = () => {
    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    console.log(centerPosition);

    if (isFullScreen === true) {
      setSize({ width: 1000, height: 600 }); //FIXME: 저장된값으로
      setPosition({ x: 0, y: 0 }); //FIXME: 저장된값으로
    } else {
      setSize({ width: "100vw", height: "100vh" });
      setPosition({ x: 0, y: 0 });
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    headRef.current?.addEventListener("dblclick", fullScreen);
    return () => {
      headRef.current?.removeEventListener("dblclick", fullScreen);
    };
  }, [isFullScreen]);

  const close = () => {
    setDisplay(!display);
  };

  return (
    <div.wrap
      style={{
        display: display ? "block" : "none",
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
      ref={windowRef}
    >
      <div.resize>
        <div.head ref={headRef}>
          <div className="title">Risk Zero 3.0</div>

          <div className="btns">
            <button onClick={fullScreen}>
              {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
            </button>

            <button onClick={close}>
              <Close />
            </button>
          </div>
        </div.head>

        <div.body>{children}</div.body>
      </div.resize>
    </div.wrap>
  );
}

const div = {
  wrap: styled.div`
    position: fixed;
    border: 1px #000 solid;
    background-color: white;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    /* transition: width 0.3s ease, height 0.3s ease; */
  `,

  resize: styled.div`
    height: 100%;
  `,

  head: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    padding: 0 5px;

    box-sizing: border-box;
    background-color: #e2e2e2;
    cursor: move;

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
