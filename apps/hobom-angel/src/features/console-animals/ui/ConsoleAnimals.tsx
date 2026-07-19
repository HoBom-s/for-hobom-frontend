import { Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { LoadingState } from "@/shared/ui";
import { useConsoleAnimals } from "../model/useConsoleAnimals";
import { AnimalRoster } from "./AnimalRoster";
import { EditForm } from "./EditForm";
import { RegisterForm } from "./RegisterForm";
import { styles } from "./ConsoleAnimals.styles";

/** §7.1 동물 관리: the roster (a sticky-header table) scrolls on the left, the
 *  register/edit form scrolls on the right. Selecting a row edits it. */
export const ConsoleAnimals = ({ shelterId }: { shelterId: string }) => {
  const { animals, editingId, edit, clearEdit, registerAnimal, updateAnimal, saving } =
    useConsoleAnimals(shelterId);

  return (
    <div {...stylex.props(styles.root)}>
      <h1 {...stylex.props(styles.title)}>동물 관리</h1>
      <p {...stylex.props(styles.subtitle)}>우리 보호소 동물 등록·수정</p>

      <div {...stylex.props(styles.toolbar)}>
        <span {...stylex.props(styles.count)}>
          우리 보호소 동물 <span {...stylex.props(styles.countNum)}>{animals.length}</span>
        </span>
        <span {...stylex.props(styles.spacer)} />
        <Hb.Button variant="primary" size="small" disabled={!editingId} onClick={clearEdit}>
          + 동물 등록
        </Hb.Button>
      </div>

      <div {...stylex.props(styles.layout)}>
        <div {...stylex.props(styles.listCol)}>
          <AnimalRoster animals={animals} editingId={editingId} onEdit={edit} />
        </div>

        <div {...stylex.props(styles.formCol)}>
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
        </div>
      </div>
    </div>
  );
};
