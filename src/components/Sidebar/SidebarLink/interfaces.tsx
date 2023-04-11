import { To } from 'react-router-dom';

export interface SidebarLinkProps {
  linkId: string | number;
  linkTitle: string;
  linkRoute: To;
}
