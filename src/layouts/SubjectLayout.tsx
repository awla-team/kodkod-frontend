import { Outlet, NavLink } from 'react-router-dom';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';

const LINKS: Array<{
  label: string;
  to: string;
  icon: JSX.Element;
}> = [
  {
    label: 'Clases',
    to: 'lessons',
    icon: (
      <CollectionsBookmarkOutlinedIcon fontSize='small' className='tw-mr-1' />
    ),
  },
  {
    label: 'Estudiantes',
    to: `students`,
    icon: <SchoolOutlinedIcon fontSize='small' className='tw-mr-1' />,
  },
  {
    label: 'Analisis',
    to: `analysis`,
    icon: <BarChartIcon fontSize='small' className='tw-mr-1' />,
  },
];

const SubjectLayout = () => {
  return (
    <div className='tw-flex tw-flex-col tw-gap-4'>
      <ul className='tw-flex tw-items-center tw-list-none tw-p-0'>
        {LINKS.map(({ label, to, icon }) =>
          label === 'Analisis' ? (
            <li
              key={label}
              className='tw-border tw-text-gray-400 tw-cursor-default'
            >
              <span className='tw-px-4'>
                {icon}
                {label}
              </span>
            </li>
          ) : (
            <li key={label} className='tw-border'>
              <NavLink
                to={to}
                className={({ isActive }: { isActive: boolean }) =>
                  (isActive
                    ? 'tw-text-primary-500 tw-relative before:tw-content-[""] before:tw-absolute before:tw-bottom-[-12px] before:tw-left-0 before:tw-w-full before:tw-h-[2px] before:tw-bg-primary-500'
                    : 'tw-text-gray-700') +
                  ' tw-px-4 tw-flex tw-items-center tw-gap-1'
                }
              >
                {icon}
                {label}
              </NavLink>
            </li>
          )
        )}
      </ul>
      <div className='tw-p-10 bg-white tw-rounded-md tw-border tw-border-solid tw-border-gray-200'>
        <Outlet />
      </div>
    </div>
  );
};

export default SubjectLayout;
