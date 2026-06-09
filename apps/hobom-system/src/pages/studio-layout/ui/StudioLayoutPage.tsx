import { Outlet } from "react-router-dom";
import { WorkspaceProvider } from "@/features/workspace";

/** /studio 하위(브라우저·에디터)를 워크스페이스 store로 감싸는 레이아웃. */
export default function StudioLayoutPage() {
  return (
    <WorkspaceProvider>
      <Outlet />
    </WorkspaceProvider>
  );
}
