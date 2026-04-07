import { useForm } from "react-hook-form";
import { useMutation, useDataLot } from "hobom-data";
import { useToast } from "@/shared/model";
import { legalDocumentQueries, legalDocumentMutations } from "@/entities/legal-document";
import type { CreateLegalDocumentRequest } from "@/entities/legal-document";

interface UseLegalDocumentFormParams {
  onSuccess: () => void;
}

const DEFAULT_VALUES: CreateLegalDocumentRequest = {
  type: 1,
  version: "",
  effectiveDate: "",
  content: "",
};

export const useLegalDocumentForm = ({ onSuccess }: UseLegalDocumentFormParams) => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  const formMethods = useForm<CreateLegalDocumentRequest>({
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  const createMutation = useMutation(legalDocumentMutations.create());

  const handleSubmit = formMethods.handleSubmit((data) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        dataLot.invalidateQueries({ queryKey: legalDocumentQueries.all() });
        openSuccessToast({ message: "새 문서 버전이 등록되었어요." });
        formMethods.reset(DEFAULT_VALUES);
        onSuccess();
      },
      onError: () => {
        openErrorToast({ message: "문서 등록에 실패했어요." });
      },
    });
  });

  return { formMethods, handleSubmit, isPending: createMutation.isPending };
};
