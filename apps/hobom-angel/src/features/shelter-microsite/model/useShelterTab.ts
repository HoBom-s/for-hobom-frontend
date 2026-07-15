import { useSearchParamsState } from "@/shared/model";
import type { SearchParamsCodec } from "@/shared/model";
import { isShelterTab } from "../lib/shelter-tabs.lib";
import type { ShelterTab } from "../lib/shelter-tabs.lib";

// `?tab=` keeps the active tab in the URL so it's shareable and survives reload.
// The default tab ("about") encodes to an empty query for a clean URL.
const TAB_CODEC: SearchParamsCodec<ShelterTab> = {
  decode: (params) => {
    const tab = params.get("tab");

    return isShelterTab(tab) ? tab : "about";
  },
  encode: (tab) => new URLSearchParams(tab === "about" ? {} : { tab }),
};

export const useShelterTab = () => useSearchParamsState(TAB_CODEC);
