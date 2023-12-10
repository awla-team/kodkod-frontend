import { type IClass } from 'global/interfaces';

export interface Route {
  title: string;
  img: string;
  path: string;
}

export interface SidebarProps {
  classes?: IClass[];
  handleOpenModal: () => void;
}
