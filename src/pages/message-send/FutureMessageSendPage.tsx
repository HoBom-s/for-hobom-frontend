import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Paper } from "@mui/material";
import { FutureMessageFunnel } from "@/features/send-future-message";
import type { FutureMessageSendSchemaType } from "@/entities/future-message";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function FutureMessageSendPage() {
  const formMethods = useForm<FutureMessageSendSchemaType>({
    mode: "onChange",
    defaultValues: {
      recipientId: "",
      title: "",
      content: "",
      scheduledAt: "",
    },
  });

  return (
    <Box sx={{ width: "100%", height: "100vh", overflowY: "hidden" }}>
      <FormProvider {...formMethods}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Layout>
            <FutureMessageFunnel />
          </Layout>
        </LocalizationProvider>
      </FormProvider>
    </Box>
  );
}

const Layout = ({ children }: { children: ReactNode }) => (
  <Paper
    elevation={2}
    sx={{
      width: "92%",
      height: "calc(100vh - 20px)",
      m: "0 auto",
      mt: "6px",
      px: 3,
      py: 1,
      bgcolor: "background.paper",
      overflowY: "none",
    }}
  >
    {children}
  </Paper>
);
