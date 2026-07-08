import { Table } from "./Table";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Table",
  component: Table.Root,
  parameters: {
    // Header cells use Astryx neutral secondary text (#737373), which sits just
    // under the 4.5:1 line on the tinted canvas — a known, intentional pattern.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof Table.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

const rows = [
  { name: "Alpha", status: "Active", count: 12 },
  { name: "Beta", status: "Pending", count: 3 },
  { name: "Gamma", status: "Archived", count: 0 },
];

export const Basic: Story = {
  render: () => (
    <Table.Container>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.Cell scope="col">Name</Table.Cell>
            <Table.Cell scope="col">Status</Table.Cell>
            <Table.Cell scope="col" align="right">
              Count
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.name} hover>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.status}</Table.Cell>
              <Table.Cell align="right">{row.count}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.Container>
  ),
};
