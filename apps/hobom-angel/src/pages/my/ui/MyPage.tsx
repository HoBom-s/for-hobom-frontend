import { Suspense } from "react";
import { MyProfile } from "@/features/account";
import { useLogout } from "@/features/session";
import { LoadingState } from "@/shared/ui";

export const MyPage = () => {
  const { mutate: logout } = useLogout();

  return (
    <Suspense fallback={<LoadingState />}>
      <MyProfile onLogout={() => logout()} />
    </Suspense>
  );
};
