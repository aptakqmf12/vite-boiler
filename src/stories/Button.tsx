import React from "react";
export interface ButtonProps {
  width: number;
  height: number;
  color: string;
  disabled: boolean;
  type: "fill" | "outline";
  valiant: "primary" | "default";
}
export default function Button({
  width,
  height,
  color,
  disabled,
  type,
  valiant,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      style={{
        width,
        height,
        color,
        border: type === "outline" ? "1px black solid" : "none",
        backgroundColor: type === "fill" ? "red" : "none",
      }}
    >
      Button
    </button>
  );
}
