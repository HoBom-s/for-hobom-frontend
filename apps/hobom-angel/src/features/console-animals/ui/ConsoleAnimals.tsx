import { Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import { LoadingState } from "@/shared/ui";
import { useConsoleAnimals } from "../model/useConsoleAnimals";
import { AnimalRoster } from "./AnimalRoster";
import { EditForm } from "./EditForm";
import { RegisterForm } from "./RegisterForm";
import { styles } from "./ConsoleAnimals.styles";

/** §07 동물 관리: register on the left, the shelter's roster on the right;
 *  selecting an animal swaps the form into edit mode. Scoped to the shelter. */
export const ConsoleAnimals = ({ shelterId }: { shelterId: string }) => {
  const { animals, editingId, edit, clearEdit, registerAnimal, updateAnimal, saving } =
    useConsoleAnimals(shelterId);

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>동물 관리</h1>
        <p {...stylex.props(styles.subtitle)}>우리 보호소 동물 {animals.length}마리 · 등록·수정</p>
      </header>

      <div {...stylex.props(styles.layout)}>
        {editingId ? (
          <Suspense fallback={<LoadingState />}>
            <EditForm
              key={editingId}
              animalId={editingId}
              onUpdate={updateAnimal}
              onCancel={clearEdit}
              saving={saving}
            />
          </Suspense>
        ) : (
          <RegisterForm onRegister={registerAnimal} saving={saving} />
        )}

        <AnimalRoster animals={animals} editingId={editingId} onEdit={edit} />
      </div>
    </div>
  );
};
