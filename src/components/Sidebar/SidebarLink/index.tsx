import { Tooltip } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { type SidebarLinkProps } from './interfaces';
import { SidebarLinkContainer } from './styled';
import { useClassroom } from 'zustand/classroom-store';
import { useSubjectStore } from 'zustand/subject-store';

const SidebarLink: React.FC<SidebarLinkProps> = ({
  linkId,
  linkTitle,
  linkRoute,
  classroom,
}) => {
  const { classId } = useParams();
  const { setSubject } = useSubjectStore();
  const { setClassroom } = useClassroom();

  const setClassroomSelected = () => {
    setClassroom(classroom?.classroom);
    setSubject(classroom?.subject);
  };

  return (
    <SidebarLinkContainer
      className={`${linkId}` === classId ? 'active' : ''}
      title={linkTitle}
      onClick={setClassroomSelected}
    >
      <Link
        to={linkRoute}
        replace
        className='d-flex flex-column align-items-center justify-content-center position-relative'
      >
        <div className='text-center'>
          <span>{linkTitle}</span>
        </div>
      </Link>
    </SidebarLinkContainer>
  );
};

export default SidebarLink;
