import { managedShelter, useCurrentUser } from "@/entities/user";
import { ConsoleSurvey } from "@/features/console-survey";
import { NotFoundState } from "@/shared/ui";

export const ConsoleSurveyPage = () => {
  const { user } = useCurrentUser();
  const shelter = managedShelter(user);

  if (!shelter) return <NotFoundState />;

  return <ConsoleSurvey shelterId={shelter.shelterId} />;
};
