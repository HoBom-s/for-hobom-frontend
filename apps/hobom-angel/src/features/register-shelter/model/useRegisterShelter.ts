import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "hobom-data";
import { shelterMutations } from "@/entities/shelter";
import { ROUTES } from "@/shared/config";
import { useToast } from "@/shared/model";
import { EMPTY_FORM, canSubmit, toRegisterInput } from "../lib/register-shelter.lib";
import type { RegisterShelterForm } from "../lib/register-shelter.lib";

/** Drives the shelter-registration form: local field state, validation, and the
 *  submit that opens the verification and returns the applicant to their page. */
export const useRegisterShelter = () => {
  const navigate = useNavigate();
  const { openSuccessToast, openErrorToast } = useToast();
  const [form, setForm] = useState<RegisterShelterForm>(EMPTY_FORM);

  const { mutate, isPending } = useMutation({
    ...shelterMutations.register(),
    onSuccess: () => {
      openSuccessToast({ message: "등록 신청이 접수됐어요. 검증 결과를 기다려주세요." });
      void navigate(ROUTES.MY, { replace: true });
    },
    onError: (error: Error) => openErrorToast({ message: error.message || "등록에 실패했어요." }),
  });

  const setField = <K extends keyof RegisterShelterForm>(key: K, value: RegisterShelterForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = () => {
    if (!canSubmit(form)) return;

    mutate(toRegisterInput(form));
  };

  return { form, setField, submit, submitting: isPending, canSubmit: canSubmit(form) };
};
