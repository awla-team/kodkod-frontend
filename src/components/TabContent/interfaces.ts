import { MouseEvent } from "react";
import { PropsWithChildren } from "react";

export interface TabContentProps extends PropsWithChildren {
  className?: string;
  index: number;
  value: number;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}
