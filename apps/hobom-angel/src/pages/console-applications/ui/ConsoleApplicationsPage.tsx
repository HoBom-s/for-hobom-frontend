import { Suspense } from "react";
import { managedShelter, useCurrentUser } from "@/entities/user";
import { ConsoleApplications } from "@/features/console-applications";
import { LoadingState, NotFoundState } from "@/shared/ui";

export const ConsoleApplicationsPage = () => {
  const { user } = useCurrentUser();
  const shelter = managedShelter(user);

  if (!shelter) return <NotFoundState />;

  return (
    <Suspense fallback={<LoadingState />}>
      <ConsoleApplications shelterId={shelter.shelterId} />
    </Suspense>
  );
};
