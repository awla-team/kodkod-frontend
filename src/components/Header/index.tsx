import React from 'react';
import UserInfo from 'components/Sidebar/UserInfo';
import { useParams, useLocation } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useSubjectStore } from 'zustand/subject-store';
import { useClassroom } from 'zustand/classroom-store';
import { useOnboarding } from 'contexts/OnboardingContext';
import { IconButton } from '@mui/material';

// Extend Window with Hubspot types
declare global {
  interface Window {
    HubSpotConversations: {
      widget: {
        close: () => void;
        open: () => void;
      }
    };
  }
}
window.HubSpotConversations = window.HubSpotConversations || {};

const Header: React.FC = () => {
  const { subject } = useSubjectStore();
  const { classroom } = useClassroom();
  const { classId } = useParams();
  const { user } = useAuth();
  const location = useLocation();
  const { openOnboardingMenu } = useOnboarding();
  const { widget } = window.HubSpotConversations;

  const toggleChatWidget = () => {
    if (document.firstElementChild?.classList.contains('hs-messages-widget-open')) {
      widget.close();
    } else {
      widget.open();
    }
  };

  return (
    <header
      className={`tw-py-2 border-gray tw-bg-white tw-flex tw-w-full tw-items-center ${
        subject &&
        classroom &&
        location.pathname.includes(`classroom/${classId}`)
          ? 'tw-justify-between'
          : 'tw-justify-end'
      } `}
    >
      {subject &&
        location.pathname.includes(`classroom/${classId}`) &&
        classroom && (
          <div className='tw-pl-4'>
            <h4 className='tw-text-xs tw-mb-0'>
              Curso seleccionado:
            </h4>
            <span className='tw-font-semibold'>
              {classroom.title || '?'}- {subject.title || '?'}
            </span>
          </div>
        )}
      <div className='tw-flex tw-items-center tw-gap-2'>
        <IconButton onClick={toggleChatWidget} id='tour-fab-button' color='default'>
          <SupportAgentIcon />
        </IconButton>
        <IconButton onClick={openOnboardingMenu} id='tour-fab-button' color='default'>
          <QuestionMarkIcon />
        </IconButton>
        <UserInfo user={user} />
      </div>
    </header>
  );
};

export default Header;