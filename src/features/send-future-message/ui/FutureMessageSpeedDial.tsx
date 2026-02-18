import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { Send } from "@mui/icons-material";
import { RoutesConfig } from "@/shared/router/config/routes.config.ts";

export const FutureMessageSpeedDial = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigation = useNavigate();

  return (
    <SpeedDial
      ariaLabel="future-message-speed-dial"
      open={open}
      sx={{
        position: "absolute",
        bottom: 32,
        right: 28,
      }}
      icon={<SpeedDialIcon />}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <SpeedDialAction
        icon={<Send />}
        slotProps={{
          tooltip: {
            title: "미래 메시지 작성하기",
          },
          fab: {
            size: "small",
          },
        }}
        onClick={() => {
          navigation(RoutesConfig.MESSAGE.SEND_FUNNEL);
        }}
      />
    </SpeedDial>
  );
};
