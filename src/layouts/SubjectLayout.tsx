import { Outlet, NavLink } from 'react-router-dom';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useEffect } from 'react';
import { useSubjectStore } from 'zustand/subject-store';
import { useParams } from 'react-router-dom';

const LINKS: Array<{
  label: string;
  to: string;
  icon: JSX.Element;
}> = [
  {
    label: 'Clases',
    to: 'lessons',
    icon: (
      <AccountBalanceWalletOutlinedIcon fontSize='small' className='tw-mr-1' />
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
  const { fetchSubject, isLoading } = useSubjectStore();
  const { classId } = useParams() as { classId: string };

  useEffect(() => {
    fetchSubject(classId);
  }, []);

  if (isLoading) return <></>;

  return (
    <div>
      <ul className='tw-flex tw-items-center tw-list-none tw-p-0 tw-gap-2'>
        {LINKS.map(({ label, to, icon }) =>
          label === 'Analisis' ? (
            <li
              key={label}
              className='tw-px-4 tw-py-4 tw-border tw-text-gray-400 tw-font-semibold tw-cursor-default'
            >
              {icon}
              {label}
            </li>
          ) : (
            <li key={label} className='tw-px-4 tw-py-4 tw-border'>
              <NavLink
                to={to}
                className={({ isActive }: { isActive: boolean }) =>
                  isActive
                    ? 'tw-text-primary tw-font-semibold'
                    : 'tw-text-gray-700 tw-font-semibold'
                }
              >
                {icon}
                {label}
              </NavLink>
            </li>
          )
        )}
      </ul>

      <div
        className='tw-p-10 bg-white tw-rounded-md'
        style={{
          border: '1px solid #E5E7EB',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default SubjectLayout;
