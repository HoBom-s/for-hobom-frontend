import {
  Card as MuiCard,
  type CardProps as MuiCardProps,
  CardContent as MuiCardContent,
  CardActions as MuiCardActions,
  CardActionArea,
} from "@mui/material";
import type { ReactNode } from "react";

const Root = ({ variant = "outlined", ...props }: MuiCardProps) => (
  <MuiCard variant={variant} {...props} />
);

const Content = MuiCardContent;
const Actions = MuiCardActions;

interface ClickableProps extends Omit<MuiCardProps, "onClick"> {
  onClick: () => void;
  children: ReactNode;
}

const Clickable = ({ onClick, children, variant = "outlined", ...props }: ClickableProps) => (
  <MuiCard variant={variant} {...props}>
    <CardActionArea onClick={onClick}>{children}</CardActionArea>
  </MuiCard>
);

export const Card = { Root, Content, Actions, Clickable };
