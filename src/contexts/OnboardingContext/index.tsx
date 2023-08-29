import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { ITour } from './interfaces';
import { Menu, MenuItem, Typography } from '@mui/material';
import { TourFab } from './styled';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { StepType, useTour } from '@reactour/tour';

const OnboardingContext = createContext<{
  setNewAvailableTours: (tours: ITour[]) => void;
}>({
  setNewAvailableTours: (tours: ITour[]) => {},
});

export const useOnboarding = () => useContext(OnboardingContext);

const OnboardingContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [availableTours, setAvailableTours] = useState<ITour[] | undefined>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { setIsOpen, setSteps, setCurrentStep } = useTour();

  const setNewAvailableTours = (tours: ITour[]) => setAvailableTours(tours);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleItemClick = (steps: StepType[]) => {
    setSteps(steps);
    setCurrentStep(0);
    setIsOpen(true);
    handleClose();
  };

  return (
    <OnboardingContext.Provider value={{ setNewAvailableTours }}>
      {children}
      <TourFab id="tour-fab-button" color="primary" onClick={handleClick}>
        <QuestionMarkIcon />
      </TourFab>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{ right: 36, top: -64 }}
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
