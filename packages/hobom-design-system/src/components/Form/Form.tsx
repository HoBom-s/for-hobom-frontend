import {
  FormControl as MuiFormControl,
  FormControlLabel as MuiFormControlLabel,
  FormHelperText as MuiFormHelperText,
  InputLabel as MuiInputLabel,
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
} from "@mui/material";

const Control = MuiFormControl;
const ControlLabel = MuiFormControlLabel;
const Helper = MuiFormHelperText;
const Label = MuiInputLabel;
const Select = MuiSelect;
// Option for `Select` — the underlying control clones these to read `value`
// and drive selection, so it stays MUI until Select itself is in-house.
const Option = MuiMenuItem;

export const Form = { Control, ControlLabel, Helper, Label, Select, Option };
