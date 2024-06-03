import { Outlet, NavLink } from 'react-router-dom';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';

const LINKS: Array<{
  label: string;
  to: string;
  icon: JSX.Element;
}> = [
  {
    label: 'Clases',
    to: `clases`,
    icon: (
      <AccountBalanceWalletOutlinedIcon fontSize='small' className='tw-mr-1' />
    ),
  },
  {
    label: 'Estudiantes',
    to: `estudiantes`,
    icon: <SchoolOutlinedIcon fontSize='small' className='tw-mr-1' />,
  },
  {
    label: 'Analisis',
    to: `seguimiento`,
    icon: <BarChartIcon fontSize='small' className='tw-mr-1' />,
  },
];

const SubjectLayout = () => {
  return (
    <div>
      <ul className='tw-flex tw-items-center tw-list-none tw-p-0 tw-gap-2'>
        {LINKS.map(({ label, to, icon }) => (
          <li key={label} className='tw-px-4 tw-py-4 tw-border'>
            <NavLink
              to={`/app/cursos/1/asignaturas/1/${to}`}
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
        ))}
      </ul>

      <div className='tw-p-10 bg-white tw-rounded-md'>
        <Outlet />
      </div>
    </div>
  );
};

export default SubjectLayout;
