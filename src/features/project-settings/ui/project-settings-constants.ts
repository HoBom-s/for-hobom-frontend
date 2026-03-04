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

const AVATAR_COLORS = [
  "#4680ff",
  "#2ca87f",
  "#e58a00",
  "#7c3aed",
  "#0891b2",
  "#dc2626",
];

export const getAvatarColor = (str: string) =>
  AVATAR_COLORS[
    str.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
      AVATAR_COLORS.length
  ];

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
};
