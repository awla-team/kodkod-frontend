import { ChevronLeft } from '@mui/icons-material';
import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const steps: Array<{
  label: string;
  description: string;
  optional?: React.ReactNode;
}> = [
  {
    label: 'Crear titulo',
    description: `Ingresa el titulo de la clase.`,
    optional: (
      <form className='tw-flex tw-flex-col tw-w-full tw-gap-2'>
        <span>Unidad 2: Ciudadanos y opinion</span>
        <input
          type='text'
          placeholder='Inserte el titulo de la clase'
          className='tw-bg-gray-100 tw-border-none focus:tw-outline-none tw-font-semibold tw-text-2xl tw-w-full tw-text-black tw-px-4 tw-py-1.5 tw-rounded'
        />
      </form>
    ),
  },
  {
    label: 'Agregar desafios',
    description: `Tus estudiantes completan al menos 2 desafíos de la clase.`,
  },
  {
    label: 'Crear recompensas',
    description:
      'Las recompensas pueden utilizarse en los últimos 15 minutos de la clase. ¡Buena suerte!',
  },
];

export default function NewLesson() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className='tw-flex tw-flex-col tw-gap-4 tw-items-start tw-w-full'>
      <button
        onClick={() => navigate(-1)}
        className='tw-bg-transparent tw-border-none tw-text-primary tw-text-sm tw-px-0'
      >
        <ChevronLeft />
        Volver a la lista de cursos
      </button>

      <div className='tw-w-full'>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant='caption'>Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent className='tw-w-full'>
                <Typography>{step.description}</Typography>
                {step.optional}
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant='contained'
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Terminar' : 'Siguiente'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Volver
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
}
