import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  LocalizationProvider,
  AdapterDateFns,
} from "hobom-design-system/date-pickers";
import { FutureMessageFunnel } from "@/features/send-future-message";
import type { FutureMessageSendSchemaType } from "@/entities/future-message";
import { Hb } from "@/shared/ui";

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
    <Hb.Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <FormProvider {...formMethods}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Layout>
            <FutureMessageFunnel />
          </Layout>
        </LocalizationProvider>
      </FormProvider>
    </Hb.Box>
  );
}

const Layout = ({ children }: { children: ReactNode }) => (
  <Hb.Paper
    elevation={2}
    sx={{
      width: "100%",
      maxWidth: 520,
      p: 4,
      borderRadius: 3,
    }}
  >
    {children}
  </Hb.Paper>
);
