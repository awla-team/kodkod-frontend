import type { IActivitySaved } from 'types/models/Activity';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

interface Props {
  index: number;
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
      className='tw-relative tw-border tw-bg-gradient-to-r tw-from-blue-600 tw-to-cyan-500 tw-rounded-md tw-min-h-40 tw-flex tw-my-3 tw-flex-row tw-justify-between tw-items-center hover:tw-cursor-pointer'
      onClick={handleClick}
    >
      {editRender && editRender}
      <div className=' tw-mx-8'>
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
    <div className='tw-absolute tw-top-5 tw-right-5 tw-flex tw-items-center'>
      <h5
        className='tw-flex tw-mr-4 tw-justify-center tw-text-white tw-border tw-border-none hover:tw-cursor-pointer tw-ease-in-out hover:tw-bg-indigo-300 hover:tw-border tw-rounded tw-transition-all tw-duration-200'
        onClick={edit}
      >
        <EditNoteIcon />
        Editar
      </h5>

      <h5
        onClick={deleteActivity}
        className='tw-flex tw-justify-center tw-text-white tw-border tw-border-none hover:tw-cursor-pointer tw-ease-in-out hover:tw-bg-indigo-300 hover:tw-border tw-rounded tw-transition-all tw-duration-200'
      >
        <DeleteForeverOutlinedIcon className='' />
        Eliminar
      </h5>
    </div>
  );
};

export default ActivityCard;
