import { Suspense } from "react";
import { managedShelter, useCurrentUser } from "@/entities/user";
import { ConsoleContent } from "@/features/console-content";
import { LoadingState, NotFoundState } from "@/shared/ui";

export const ConsoleContentPage = () => {
  const { user } = useCurrentUser();
  const shelter = managedShelter(user);

  if (!shelter) return <NotFoundState />;

  return (
    <Suspense fallback={<LoadingState />}>
      <ConsoleContent shelterId={shelter.shelterId} />
    </Suspense>
  );
};
