import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  postSelectTodayMenu,
  useUpdateTodayMenuCache,
} from "@/entities/menu-recommendation";
import { useToast } from "@/shared/model";
import { delayThen } from "@/shared/lib";

const DELAY_MS = 1500;

export const useSelectTodayMenu = () => {
  const [status, setStatus] = useState<"loading" | "delay" | "done">("loading");

  const { updateCache } = useUpdateTodayMenuCache();
  const { openErrorToast } = useToast();

  return {
    status,
    handler: useMutation({
      mutationFn: postSelectTodayMenu,
      onSuccess: () => {
        delayThen(DELAY_MS, updateCache)
          .catch(() =>
            openErrorToast({ message: "Failed to fetch updated menu!" }),
          )
          .finally(() => setStatus("done"));
      },
      onError: () => {
        setStatus("done");
        openErrorToast({ message: "오류가 발생했어요." });
      },
    }),
  };
};
