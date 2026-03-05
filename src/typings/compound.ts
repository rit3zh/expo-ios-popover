import type { FC, PropsWithChildren } from "react";

type TCompoundComponent<Props, T, C, P> = FC<PropsWithChildren<Props>> & {
  Trigger: T;
  Content: C;
  Pressable: P;
};

export type { TCompoundComponent };
