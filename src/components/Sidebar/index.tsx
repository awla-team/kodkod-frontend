import { type FC } from 'react';
import { type SidebarProps } from './interfaces';
import logo from 'assets/images/logo.png';
import { SidebarContainer, LinkList, LogoContainer } from './styled';
import SidebarLink from './SidebarLink';
import { Divider } from '@mui/material';
import { type ITeacherSubjectClassroom } from 'global/interfaces';
import { RoundButton } from './RoundButton/styled';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: FC<SidebarProps> = ({ classrooms /* handleOpenModal */ }) => {
  const { user } = useAuth();

  return (
    <SidebarContainer className='justify-content-between tw-bg-white'>
      <div
        className='d-flex flex-column align-items-center'
        id='home-onboarding-5'
      >
        <LogoContainer>
          <img src={logo} />
        </LogoContainer>
        <Divider className='w-75 my-4' color='gray' />
        <span className='text-center fw-bold p-0 mb-3'>Cursos</span>
        <RouterLink to='/app'>
          <RoundButton color='primary' className='home-button'>
            <HomeIcon />
          </RoundButton>
        </RouterLink>
        {
          // FIXME: fix this ts error
          // @ts-expect-error ts-error(18048)
          classrooms.length ? (
            <LinkList>
              {classrooms
                ?.sort((a, b) => {
                  if (a.classroom.title > b.classroom.title) return 1;
                  if (a.classroom.title < b.classroom.title) return -1;
                  return 0;
                })
                .map?.((teacherClassroom: ITeacherSubjectClassroom, index) => (
                  <div key={index}>
                    <SidebarLink
                      classroom={teacherClassroom}
                      key={`side-bar-${teacherClassroom.classroom_id}`}
                      linkId={teacherClassroom.classroom_id}
                      linkTitle={teacherClassroom.classroom.title}
                      linkRoute={`cursos/${teacherClassroom.classroom_id}/asignaturas/${teacherClassroom.subject?.id}/clases`}
                    />
                  </div>
                ))}
            </LinkList>
          ) : null
        }
        {/* <RoundButton
          id='home-onboarding-2'
          sx={{ marginBottom: '74px' }}
          color='info'
          onClick={() => {
            handleOpenModal();
          }}
        >
          <AddIcon />
        </RoundButton> */}
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
