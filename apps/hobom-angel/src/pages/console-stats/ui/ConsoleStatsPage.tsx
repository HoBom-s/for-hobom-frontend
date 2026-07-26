import { Suspense } from "react";
import { managedShelter, useCurrentUser } from "@/entities/user";
import { ConsoleStats } from "@/features/console-stats";
import { LoadingState, NotFoundState } from "@/shared/ui";

export const ConsoleStatsPage = () => {
  const { user } = useCurrentUser();
  const shelter = managedShelter(user);

  if (!shelter) return <NotFoundState />;

  return (
    <Suspense fallback={<LoadingState />}>
      <ConsoleStats shelterId={shelter.shelterId} />
    </Suspense>
  );
};
