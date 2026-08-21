import { useDataLot, useMutation } from "hobom-data";
import { useNavigate } from "react-router";
import { inquiryMutations, inquiryQueries } from "@/entities/inquiry";
import { inquiryPath } from "@/shared/config";
import { useToast } from "@/shared/model";

/** Opens an inquiry about an animal and, on success, drops the viewer into the
 *  new message thread. */
export const useStartInquiry = (animalId: string, onDone: () => void) => {
  const navigate = useNavigate();
  const dataLot = useDataLot();
  const { openErrorToast } = useToast();

  const mutation = useMutation({
    ...inquiryMutations.start(),
    onSuccess: (result) => {
      void dataLot.invalidateQueries({ queryKey: inquiryQueries.all() });
      onDone();
      void navigate(inquiryPath(result.inquiryId));
    },
    onError: (error: Error) =>
      openErrorToast({ message: error.message || "문의 전송에 실패했어요." }),
  });

  return {
    start: (message: string) => mutation.mutate({ animalId, input: { message } }),
    starting: mutation.isPending,
  };
};
