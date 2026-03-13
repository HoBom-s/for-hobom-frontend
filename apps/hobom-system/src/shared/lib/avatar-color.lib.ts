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
