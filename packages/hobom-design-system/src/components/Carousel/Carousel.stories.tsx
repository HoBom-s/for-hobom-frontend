import { Carousel } from "./Carousel";
import { Image } from "../Image";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  args: { children: null },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const seeds = ["carA", "carB", "carC", "carD"];

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Carousel aria-label="예시 이미지">
        {seeds.map((seed) => (
          <Image
            key={seed}
            src={`https://picsum.photos/seed/${seed}/720/720`}
            alt={seed}
            ratio="1 / 1"
          />
        ))}
      </Carousel>
    </div>
  ),
};

export const SingleImage: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Carousel aria-label="단일 이미지">
        <Image src="https://picsum.photos/seed/single/720/720" alt="single" ratio="1 / 1" />
      </Carousel>
    </div>
  ),
};
