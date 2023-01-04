import { Class } from "services/classes/interfaces";

export interface Route {
  title: string;
  img: string;
  path: string;
}

export interface SidebarProps {
  classes?: Class[];
}
