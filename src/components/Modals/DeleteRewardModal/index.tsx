import { useModalStore } from 'contexts/ZustandContext/modal-context';
import { type FC } from 'react';
import { useCreateLesson } from 'zustand/create-lesson-store';

export default function DeleteRewardModalDialog({
  editedReward,
  index,
  rewardDeleteListAdd,
}: {
  editedReward: boolean;
  index: number;
  rewardDeleteListAdd?: () => void;
}) {
  const { closeModal } = useModalStore();
  const { deleteReward, deleteEditLessonReward } = useCreateLesson();

  const confirmDelete = () => {
    deleteReward(index);
    closeModal();
  };

  const confirmDeleteEdited = () => {
    deleteEditLessonReward(index);
    if (rewardDeleteListAdd) {
      rewardDeleteListAdd();
    }
    closeModal();
  };

  return (
    <div>
      {editedReward ? (
        <div>
          <form>
            <h5 className='tw-flex tw-justify-center tw-mb-8'>
              <b>Quiere eliminar esta recompensa?</b>
            </h5>
            <div className='tw-flex tw-justify-center tw-items-center tw-gap-2'>
              <button
                onClick={closeModal}
                type='button'
                className=' tw-bg-gray-300 tw-text-black border'
              >
                Cancelar
              </button>
              <button
                type='button'
                className=' tw-bg-red-500 tw-text-black border'
                onClick={confirmDeleteEdited}
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <form>
            <h5 className='tw-flex tw-justify-center tw-mb-8'>
              <b>Quiere eliminar esto?</b>
            </h5>
            <div className='tw-flex tw-justify-center tw-items-center tw-gap-2'>
              <button
                onClick={closeModal}
                type='button'
                className=' tw-bg-gray-300 tw-text-black border'
              >
                Cancelar
              </button>
              <button
                type='button'
                className=' tw-bg-red-500 tw-text-black border'
                onClick={confirmDelete}
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
