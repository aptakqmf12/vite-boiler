import {
  useState,
  useEffect,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";
import { SizeType } from "../components/layout/window";

interface ResizeProps {
  targetRef: RefObject<HTMLDivElement>;
  width: number | string;
  height: number | string;
  setSize: Dispatch<SetStateAction<SizeType>>;
}

export default function useResize({
  targetRef,
  width,
  height,
  setSize,
}: ResizeProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  // 1. side에서 클릭시 state처리
  useEffect(() => {
    const down = () => setIsPressed(true);
    const up = () => setIsPressed(false);
    targetRef.current?.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      targetRef.current?.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);
  // 2. 마우스 드래그시 처리
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPrevX(currentX);
      setPrevY(currentY);
      setCurrentX(e.clientX);
      setCurrentY(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [currentX, currentY]);
  // 3. 마우스 클릭인채로 드래그시
  useEffect(() => {
    if (isPressed) {
      setCurrentX(currentX);
      setCurrentY(currentY);
    }
  }, [isPressed, currentX, currentY]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!isPressed) return;
      if (typeof width === "string" || typeof height === "string") return;

      setSize({
        width: width + (currentX - prevX),
        height: height + (currentX - prevX),
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isPressed, currentX, currentY, prevX, prevY]);
}
