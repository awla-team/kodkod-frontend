import type { IActivitySaved } from 'types/models/Activity';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  activity: IActivitySaved & {
    studentsCompletedActivity: number;
  };
  handleClick?: () => void;
  editRender?: React.ReactNode;
}

const ActivityCard: React.FC<Props> = ({
  activity,
  handleClick,
  editRender,
}) => {
  return (
    <div
      className='tw-relative tw-border tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-800 tw-rounded-md tw-min-h-40 tw-flex tw-flex-row tw-justify-between tw-items-center tw-gap-3 tw-p-4'
      onClick={handleClick}
    >
      {editRender && editRender}
      <div className='tw-mx-8'>
        <h3 className='tw-font-bold tw-text-white'>{activity.title}</h3>
        <h5 className='tw-font-bold tw-text-white tw-break-all tw-mb-4'>
          {activity.description}
        </h5>
      </div>

      {!editRender && (
        <h5 className='tw-text-white tw-m-8 tw-font-bold'>
          <EmojiPeopleIcon /> {activity.studentsCompletedActivity}
        </h5>
      )}
    </div>
  );
};

export const ActiviyCardEditRender: React.FC<{
  edit: () => void;
  delete: () => void;
}> = ({ edit, delete: deleteActivity }) => {
  return (
    <div className='tw-absolute tw-top-5 tw-right-5 tw-flex tw-items-center tw-gap-2'>
      <Button
        type='button'
        color='secondary'
        variant='outlined'
        startIcon={<EditIcon className='tw-w-5 tw-h-5' />}
        onClick={edit}
      >
        Editar
      </Button>

      <Button
        type='button'
        color='secondary'
        variant='outlined'
        startIcon={<DeleteForeverOutlinedIcon className='tw-w-5 tw-h-5' />}
        onClick={deleteActivity}
      >
        Eliminar
      </Button>
    </div>
  );
};

export default ActivityCard;
