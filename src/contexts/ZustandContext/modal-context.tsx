import {
  Dialog,
  DialogContent,
  DialogTitle,
  type Breakpoint,
  DialogActions,
  Button,
} from '@mui/material';
import { type PropsWithChildren, type ReactNode } from 'react';
import { create } from 'zustand';

interface Store {
  isOpen: boolean;
  title: string;
  content: ReactNode;
  maxWidth: Breakpoint;
  withActions: boolean;
  confirmAction: {
    title: string;
    callback: () => void;
  };
  isDisabledConfirmBtn: boolean;
}

interface Action {
  openModal: ({
    title,
    content,
    maxWidth,
    withActions,
  }: {
    title?: string;
    content: ReactNode;
    maxWidth?: Breakpoint;
    withActions?: boolean;
  }) => void;
  closeModal: () => void;
  setTitle: (title: string) => void;
  setContentModal: ({
    content,
    withActions,
    confirmAction,
  }: {
    content: ReactNode;
    withActions?: boolean;
    confirmAction: {
      title?: string;
      callback?: () => void;
    };
  }) => void;
  setConfirmActions: ({
    title,
    callback,
  }: {
    title: string;
    callback: () => void;
  }) => void;
  setIsDisabledCofirmBtn: (isDisabled: boolean) => void;
}

const modalStore = create<Store & Action>((set) => ({
  isOpen: false,
  openModal: ({ title = '', content, maxWidth = 'md', withActions = false }) =>
    set({ isOpen: true, title, content, maxWidth, withActions }),
  closeModal: () => set({ isOpen: false }),
  title: '',
  setTitle: (title) => set({ title }),
  content: <div />,
  setContentModal: ({ content, withActions = false }) =>
    set({
      content,
      withActions,
    }),
  maxWidth: 'md',
  withActions: false,
  confirmAction: {
    title: '',
    callback: () => {},
  },
  setConfirmActions: ({ title, callback }) =>
    set({
      confirmAction: { title, callback },
    }),
  isDisabledConfirmBtn: true,
  setIsDisabledCofirmBtn: (isDisabled) =>
    set({ isDisabledConfirmBtn: isDisabled }),
}));

export const useModalStore = modalStore;

export const ModalContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const {
    isOpen,
    title,
    content,
    closeModal,
    maxWidth,
    withActions,
    confirmAction,
    isDisabledConfirmBtn,
  } = useModalStore();
  const { title: confirmActionTitle, callback: confirmActionCallback } =
    confirmAction;

  return (
    <>
      {children}
      <Dialog open={isOpen} onClose={closeModal} maxWidth={maxWidth} fullWidth>
        <DialogTitle className='tw-flex tw-items-center tw-gap-3'>
          {title}
        </DialogTitle>

        <DialogContent dividers>{content}</DialogContent>

        {withActions && (
          <DialogActions>
            <Button variant='outlined' onClick={closeModal}>
              Cancelar
            </Button>
            <Button
              variant='contained'
              onClick={confirmActionCallback}
              disabled={isDisabledConfirmBtn}
            >
              {confirmActionTitle}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};