import { PropsWithChildren, ReactNode } from "react";

export interface ModuleTabsProps extends PropsWithChildren {
  tabs?: ReactNode | null;
  onChange?: any;
}
