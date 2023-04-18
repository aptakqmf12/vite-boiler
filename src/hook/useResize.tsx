import {
  useState,
  useEffect,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";
import type { SizeType } from "../components/layout/window";

interface useResizeProps {
  target: RefObject<HTMLDivElement>;
  side: RefObject<HTMLDivElement>;
  setSize: Dispatch<SetStateAction<SizeType>>;
}

export default function useResize({ target, side, setSize }: useResizeProps) {
  const [isPressed, setIsPressed] = useState(false);

  const [prevWidth, setPrevWidth] = useState();
  const [prevHeight, setPrevHeight] = useState();
  const [currentWidth, setCurrentWidth] = useState();
  const [currentHeight, setCurrentHeight] = useState();

  useEffect(() => {
    const mouseDown = () => setIsPressed(true);
    const mouseUp = () => setIsPressed(false);

    side.current?.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      side.current?.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  useEffect(() => {}, []);

  //   useEffect(() => {
  //     if (!target.current) return;
  //     const rect = target.current.getBoundingClientRect();

  //     const moveFn = (e: MouseEvent) => {
  //       const dx = e.clientX - rect.right;
  //       const dy = e.clientY - rect.bottom;

  //       setSize((prevSize) => ({
  //         width: Number(prevSize.width) + 1,
  //         height: Number(prevSize.height) + 1,
  //       }));
  //     };

  //     if (isPressed) {
  //       window.addEventListener("mousemove", moveFn);
  //     }

  //     return () => {
  //       window.removeEventListener("mousemove", moveFn);
  //     };
  //   }, [isPressed]);

  return { isPressed };
}
