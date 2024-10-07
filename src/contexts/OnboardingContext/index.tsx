import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { type ITour } from './interfaces';
import { Menu, MenuItem } from '@mui/material';
import { type StepType, useTour } from '@reactour/tour';

const OnboardingContext = createContext<{
  setNewAvailableTours?: (tours: ITour[]) => void;
  openOnboardingMenu?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleFinish?: () => void;
  currentView?: string;
}>({});

export const useOnboarding = () => useContext(OnboardingContext);

const OnboardingContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [availableTours, setAvailableTours] = useState<ITour[] | undefined>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { setIsOpen, setSteps, setCurrentStep } = useTour();
  const setNewAvailableTours = (tours: ITour[]) => setAvailableTours(tours);
  const openOnboardingMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleItemClick = (steps: StepType[]) => {
    // FIXME: fix this ts error
    // @ts-expect-error ts-error(2722)
    setSteps(steps);
    setCurrentStep(0);
    setIsOpen(true);
    handleClose();
  };

  return (
    <OnboardingContext.Provider value={{ setNewAvailableTours, openOnboardingMenu }}>
      {children}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{ right: 0, top: 42 }}
      >
        <MenuItem disabled>Tutoriales</MenuItem>
        {availableTours?.map((tour, i) => (
          <MenuItem
            key={`tour-item-${i}`}
            onClick={() => handleItemClick(tour.steps)}
          >
            {tour.name}
          </MenuItem>
        ))}
      </Menu>
    </OnboardingContext.Provider>
  );
};

export default OnboardingContextProvider;
