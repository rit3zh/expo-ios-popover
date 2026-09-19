export const FOLDER_STACK_RATIOS = {
  peek: 0.2,
  fileWidth: 0.46,
  badge: 0.075,
  signature: 0.22,
  sticker: 0.3,
  inset: 0.07,
} as const;

export const FOLDER_STACK_FILE_FAN = [
  { left: 0.1, top: 0.08, rotation: -7 },
  { left: 0.3, top: 0.0, rotation: 3 },
  { left: 0.46, top: 0.1, rotation: 10 },
] as const;

export const FOLDER_STACK_GLASS = {
  tintColor: "#e4e4e85b",
  colorScheme: "light",
} as const;
