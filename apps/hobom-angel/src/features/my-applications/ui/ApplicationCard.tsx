import { Hb } from "hobom-design-system";
import { AnimalCard, STATUS_LABEL as ANIMAL_STATUS_LABEL, animalMeta } from "@/entities/animal";
import { KIND_LABEL, STATUS_COLOR, STATUS_LABEL } from "@/entities/application";
import { animalDetailPath } from "@/shared/config";
import type { AnimalDetail } from "@/entities/animal";
import type { ApplicationSummary } from "@/entities/application";

interface ApplicationCardProps {
  application: ApplicationSummary;
  animal: AnimalDetail | undefined;
}

/** An application shown as an animal card (matching 찜한 동물), with the
 *  application's kind · status overlaid on the photo. */
export const ApplicationCard = ({ application, animal }: ApplicationCardProps) => (
  <AnimalCard
    name={animal?.name ?? "이름 미상"}
    status={animal ? ANIMAL_STATUS_LABEL[animal.status] : "입양가능"}
    meta={animal ? animalMeta(animal) : ""}
    imageUrl={animal?.photoUrl}
    to={animalDetailPath(application.animalId)}
    overlayStart={
      <Hb.Chip
        label={`${KIND_LABEL[application.kind]} · ${STATUS_LABEL[application.status]}`}
        color={STATUS_COLOR[application.status]}
        variant="filled"
        size="small"
      />
    }
  />
);
