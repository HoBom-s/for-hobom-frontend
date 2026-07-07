import { Card } from "./Card";
import { Text } from "../Text/Text";
import { Button } from "../Button/Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Card",
  component: Card.Root,
} satisfies Meta<typeof Card.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  render: () => (
    <Card.Root style={{ width: 280 }}>
      <Card.Content>
        <Text variant="h6">Outlined card</Text>
        <Text variant="body2" color="text.secondary">
          A bordered surface with content padding.
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button size="small" variant="ghost">
          Cancel
        </Button>
        <Button size="small">Save</Button>
      </Card.Actions>
    </Card.Root>
  ),
};

export const Elevation: Story = {
  render: () => (
    <Card.Root variant="elevation" style={{ width: 280 }}>
      <Card.Content>
        <Text variant="h6">Elevation card</Text>
        <Text variant="body2" color="text.secondary">
          A raised surface with a soft shadow.
        </Text>
      </Card.Content>
    </Card.Root>
  ),
};

export const Clickable: Story = {
  render: () => (
    <Card.Clickable variant="outlined" style={{ width: 280 }} onClick={() => {}}>
      <Card.Content>
        <Text variant="h6">Clickable card</Text>
        <Text variant="body2" color="text.secondary">
          The whole surface is a button; hover for the overlay.
        </Text>
      </Card.Content>
    </Card.Clickable>
  ),
};
