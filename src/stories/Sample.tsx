import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@mui/material";

const Sample = () => {
  return <div>sample component</div>;
};

const meta = {
  title: "Example/Sample",
  component: Sample,
  tags: ["autodocs"],
  argTypes: {
    color: {},
  },
} satisfies Meta<typeof Sample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Test",
    size: "small",
  },
  argTypes: {},
};
