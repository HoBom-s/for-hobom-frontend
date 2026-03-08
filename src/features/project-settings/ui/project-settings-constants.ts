export const ROLE_LABEL: Record<string, string> = {
  ADMIN: "관리자",
  MEMBER: "멤버",
  VIEWER: "뷰어",
};

export const ROLE_COLOR: Record<string, string> = {
  ADMIN: "#7c3aed",
  MEMBER: "#4680ff",
  VIEWER: "#6b7280",
};

export { getAvatarColor } from "@/shared/lib";

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};
