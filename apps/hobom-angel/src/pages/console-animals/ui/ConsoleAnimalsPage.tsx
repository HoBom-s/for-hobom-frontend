import { Suspense } from "react";
import { managedShelter, useCurrentUser } from "@/entities/user";
import { ConsoleAnimals } from "@/features/console-animals";
import { LoadingState, NotFoundState } from "@/shared/ui";

export const ConsoleAnimalsPage = () => {
  const { user } = useCurrentUser();
  const shelter = managedShelter(user);

  if (!shelter) return <NotFoundState />;

  return (
    <Suspense fallback={<LoadingState />}>
      <ConsoleAnimals shelterId={shelter.shelterId} />
    </Suspense>
  );
};
