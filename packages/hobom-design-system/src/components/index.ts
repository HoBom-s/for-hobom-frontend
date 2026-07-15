// Batch 1 — custom wrappers
import { Box } from "./Box";
import { Stack } from "./Stack";
import { Paper } from "./Paper";
import { Divider } from "./Divider";
import { Text } from "./Text";
import { Button } from "./Button";
import { TextField } from "./TextField";
import { Chip } from "./Chip";
import { Image } from "./Image";
import { Dialog } from "./Dialog";
import { Card } from "./Card";
// Batch 2 — passthrough
import { Tooltip } from "./Tooltip";
import { Avatar } from "./Avatar";
import { Popover } from "./Popover";
import { ButtonBase } from "./ButtonBase";
import { Checkbox } from "./Checkbox";
import { Link } from "./Link";
import { Badge } from "./Badge";
import { Alert } from "./Alert";
import { Autocomplete } from "./Autocomplete";
import { Pagination } from "./Pagination";
import { Grid } from "./Grid";
import { Collapse } from "./Collapse";
import { InputBase } from "./InputBase";
import { Drawer } from "./Drawer";
import { ToggleButton, ToggleButtonGroup } from "./ToggleButton";
// Batch 2 — compound
import { Progress } from "./Progress";
import { Skeleton } from "./Skeleton";
import { Menu } from "./Menu";
import { List } from "./List";
import { Tabs } from "./Tabs";
import { Form } from "./Form";
import { Table } from "./Table";
import { Radio } from "./Radio";
import { Accordion } from "./Accordion";
// Batch 3 — composition patterns
import { SectionCard } from "./SectionCard";
import { PageHeader } from "./PageHeader";
import { Breadcrumb } from "./Breadcrumb";
import { DescriptionList } from "./DescriptionList";
import { StatGroup } from "./StatGroup";
import { Gallery } from "./Gallery";
// Batch 2 — infra
import { CssBaseline, GlobalStyles } from "./Infra";
import { ColorSchemeProvider } from "../foundations/color-scheme";

export const Hb = {
  // Batch 1
  Box,
  Stack,
  Paper,
  Divider,
  Text,
  Button,
  TextField,
  Chip,
  Image,
  Dialog,
  Card,
  // Batch 2 — passthrough
  Tooltip,
  Avatar,
  Popover,
  ButtonBase,
  Checkbox,
  Link,
  Badge,
  Alert,
  Autocomplete,
  Pagination,
  Grid,
  Collapse,
  InputBase,
  Drawer,
  ToggleButton,
  ToggleButtonGroup,
  // Batch 2 — compound
  Progress,
  Skeleton,
  Menu,
  List,
  Tabs,
  Form,
  Table,
  Radio,
  Accordion,
  // Batch 3 — composition patterns
  SectionCard,
  PageHeader,
  Breadcrumb,
  DescriptionList,
  StatGroup,
  Gallery,
  // Batch 2 — infra
  CssBaseline,
  GlobalStyles,
  ColorSchemeProvider,
} as const;
