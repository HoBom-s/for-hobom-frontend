import { Suspense } from "react";
import { managedShelter, useCurrentUser } from "@/entities/user";
import { ConsoleVolunteer } from "@/features/console-volunteer";
import { LoadingState, NotFoundState } from "@/shared/ui";

export const ConsoleVolunteerPage = () => {
  const { user } = useCurrentUser();
  const shelter = managedShelter(user);

  if (!shelter) return <NotFoundState />;

  return (
    <Suspense fallback={<LoadingState />}>
      <ConsoleVolunteer shelterId={shelter.shelterId} />
    </Suspense>
  );
};
