import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@mui/material";
// import Button from "./Button";
const meta = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    color: {},
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Test",
    size: "small",
    variant: "outlined",
    color: "info",
    disabled: false,
    sx: {
      width: 100,
    },
  },
  // https://storybook.js.org/docs/react/essentials/controls
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    variant: {
      options: ["text", "outlined", "contained"],
      control: { type: "select" },
    },
    color: {
      options: ["primary", "secondary", "success", "error", "info"],
      control: { type: "select" },
    },
  },
};
