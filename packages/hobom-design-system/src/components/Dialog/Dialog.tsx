import {
  Dialog as MuiDialog,
  type DialogProps as MuiDialogProps,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  DialogContentText as MuiDialogContentText,
} from "@mui/material";

type DialogSize = "xs" | "sm" | "md" | "lg";

interface DialogRootProps extends Omit<MuiDialogProps, "maxWidth" | "fullWidth"> {
  size?: DialogSize;
}

const Root = ({ size = "sm", ...props }: DialogRootProps) => (
  <MuiDialog maxWidth={size} fullWidth {...props} />
);

const Title = MuiDialogTitle;
const Content = MuiDialogContent;
const Actions = MuiDialogActions;
const ContentText = MuiDialogContentText;

export const Dialog = { Root, Title, Content, Actions, ContentText };
