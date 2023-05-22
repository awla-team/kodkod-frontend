import type { PropsWithChildren, MouseEvent } from 'react';
import { IClass } from 'global/interfaces';

export interface Levels {
  id: number | string;
  name: string;
}

export interface CreateClassModalProps {
  open: boolean;
  onClose: (reason: 'backdropClick' | 'escapeKeyDown' | 'success', data?: IClass) => void;
  levels: Levels[];

  classDetails?: IClass;
}

export interface FormInitialState {
  id_level: number | '';
  code: string;
  alias: string;
}
