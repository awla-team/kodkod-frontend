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

/**
 * `ActivityCard` is a React functional component that displays an activity card with a title, description,
 * and optionally an edit render component. It also shows the number of students who have completed the activity.
 *
 * @component
 * @param {Props} props - The props for the component.
 * @param {Object} props.activity - The activity object containing details to be displayed.
 * @param {React.ReactNode} [props.editRender] - Optional render component for edit mode.
 *
 * @returns {JSX.Element} The rendered activity card component.
 */
const ActivityCard: React.FC<Props> = ({
  activity,
  handleClick,
  editRender,
}) => {
  return (
    <div
      className='tw-relative tw-border tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-800 tw-rounded-md tw-min-h-40 tw-flex tw-flex-col tw-justify-start tw-items-start tw-gap-3 tw-p-6 hover:tw-cursor-pointer'
      onClick={handleClick}
    >
      {editRender && editRender}
      <div className='tw-flex tw-justify-between tw-w-full'>
        <div className='tw-flex tw-flex-col'>
          <h3 className='tw-font-bold tw-text-white'>{activity.title}</h3>
          <h5 className='tw-font-bold tw-text-white tw-break-all '>
            {activity.description}
          </h5>
        </div>

        {!editRender && (
          <h5 className='tw-text-white tw-font-bold'>
            <EmojiPeopleIcon /> {activity.studentsCompletedActivity}
          </h5>
        )}
      </div>
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
