import { Suspense } from "react";
import { managedShelter, useCurrentUser } from "@/entities/user";
import { ConsoleStaff } from "@/features/console-staff";
import { LoadingState, NotFoundState } from "@/shared/ui";

export const ConsoleStaffPage = () => {
  const { user } = useCurrentUser();
  const shelter = managedShelter(user);

  if (!shelter) return <NotFoundState />;

  return (
    <Suspense fallback={<LoadingState />}>
      <ConsoleStaff shelterId={shelter.shelterId} />
    </Suspense>
  );
};
