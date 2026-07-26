import { Gallery } from "./Gallery";
import type { Meta, StoryObj } from "@storybook/react-vite";

const images = [
  { src: "https://picsum.photos/seed/hobom1/600/450", alt: "콩이 사진 1" },
  { src: "https://picsum.photos/seed/hobom2/600/450", alt: "콩이 사진 2" },
  { src: "https://picsum.photos/seed/hobom3/600/450", alt: "콩이 사진 3" },
  { src: "https://picsum.photos/seed/hobom4/600/450", alt: "콩이 사진 4" },
];

const meta = {
  title: "Components/Gallery",
  component: Gallery,
  args: { images },
} satisfies Meta<typeof Gallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <Gallery images={images} alt="콩이" style={{ maxWidth: 420 }} />,
};

export const SingleImage: Story = {
  render: () => <Gallery images={images.slice(0, 1)} alt="콩이" style={{ maxWidth: 420 }} />,
};
