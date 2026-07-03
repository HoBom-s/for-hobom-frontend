import { TextField as MuiTextField, type TextFieldProps as MuiTextFieldProps } from "@mui/material";

type TextFieldProps = Omit<MuiTextFieldProps, "variant">;

export const TextField = (props: TextFieldProps) => <MuiTextField variant="outlined" {...props} />;
