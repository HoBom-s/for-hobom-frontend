import { mutationOptions } from "hobom-data";
import { decideApplication } from "./application.api";
import type { DecideApplicationInput } from "./application.type";
import type { ApplicationKind } from "../model/application.model";

export const applicationMutations = {
  decide: () =>
    mutationOptions({
      mutationFn: (vars: { kind: ApplicationKind; id: string; input: DecideApplicationInput }) =>
        decideApplication(vars.kind, vars.id, vars.input),
    }),
} as const;
