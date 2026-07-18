import { useState } from "react";
import { useDataLot, useMutation, useSuspenseQuery } from "hobom-data";
import { animalMutations, animalQueries } from "@/entities/animal";
import { useToast } from "@/shared/model";
import type { RegisterAnimalInput, UpdateAnimalInput } from "@/entities/animal";

/** The console's animal registry for a shelter: the roster plus register / edit,
 *  invalidating the roster so a change shows immediately. Tracks which animal is
 *  being edited (null = the register form). */
export const useConsoleAnimals = (shelterId: string) => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);

  const listOptions = animalQueries.byShelter(shelterId);
  const { data: animals } = useSuspenseQuery(listOptions);

  const settle = (message: string) => {
    openSuccessToast({ message });
    void dataLot.invalidateQueries(listOptions);
    setEditingId(null);
  };

  const onError = (error: Error) => openErrorToast({ message: error.message || "저장에 실패했어요." });

  const register = useMutation({
    ...animalMutations.register(shelterId),
    onSuccess: () => settle("동물을 등록했어요."),
    onError,
  });

  const update = useMutation({
    ...animalMutations.update(),
    onSuccess: (_data, vars) => {
      settle("동물 정보를 수정했어요.");
      void dataLot.invalidateQueries(animalQueries.detail(vars.animalId));
    },
    onError,
  });

  return {
    animals,
    editingId,
    edit: setEditingId,
    clearEdit: () => setEditingId(null),
    registerAnimal: (input: RegisterAnimalInput) => register.mutate(input),
    updateAnimal: (input: UpdateAnimalInput) => {
      if (editingId) update.mutate({ animalId: editingId, input });
    },
    saving: register.isPending || update.isPending,
  };
};
