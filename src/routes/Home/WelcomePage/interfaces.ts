import { type PropsWithChildren } from 'react';

export interface WelcomePageProps extends PropsWithChildren {
  handleOpenModal: () => void;
}
