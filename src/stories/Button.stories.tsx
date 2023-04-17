import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@mui/material";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
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

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    disabled: false,
    size: "small",
    variant: "outlined",
    children: "Test",
    color: "info",
  },
};

export const Secondary: Story = {
  args: {},
};
