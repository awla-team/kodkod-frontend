import { Typography } from '@mui/material';
import OnboardingContent from 'components/OnboardingContent';

const AdventureSelectionOnboarding = [
  {
    action: (element: HTMLElement) =>
      document.getElementById('adventure-selection-back')?.click(),
    content: () => {
      return (
        <OnboardingContent title='Selección de aventura'>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Una aventura es un paquete de <b>interacciones positivas</b>{' '}
              planificadas y ordenadas previamente para{' '}
              <b>alcanzar objetivos</b> concretos con nuestros estudiantes{' '}
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 0,
    position: 'center',
  },
  {
    action: (element: HTMLElement) => {
      if (!element?.classList?.contains('selected')) element?.click();
    },
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              Para encontrar la aventura que queremos para nuestro curso,
              primero debemos <b>seleccionar un objetivo</b>.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#goal-card-0', // '#adventure-selection-onboarding-1',
    padding: 8,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('adventure-selection-back')?.click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              Esto nos permitirá pulsar el botón <b>“Continuar”</b> para
              avanzar.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#adventure-selection-onboarding-2',
    padding: 8,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('adventure-selection-onboarding-2')?.click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              Al hacerlo, se desplegará un catálogo de aventuras disponibles
              para ese objetivo.
            </Typography>
            <Typography variant='body1' component='p'>
              <b>¡Con el tiempo, añadiremos más y mejores aventuras!</b>
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    position: 'center',
    padding: 0,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('adventure-selection-close-modal')?.click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              Al hacer click en una aventura, podrás previsualizarla.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#adventure-card-0',
    padding: 8,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('adventure-card-0')?.click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              Verás un breve <b>resumen</b>, un detalle de los{' '}
              <b>resultados esperados</b>, y las <b>etapas</b> de la aventura.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#adventure-selection-onboarding-5',
    padding: 0,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('adventure-card-0')?.click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              Finalmente, cuando te decidas por una, solo debes presionar el
              botón <b>"Quiero esta aventura"</b>
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#adventure-selection-onboarding-6',
    padding: 8,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('adventure-selection-close-modal')?.click(),
    content: () => {
      return (
        <OnboardingContent title='¡Tutorial completado!'>
          <div className='d-flex flex-column gap-2'>
            <Typography>
              Recuerda que puedes acceder a este y otros tutoriales presionando
              el botón de ayuda.
            </Typography>
            <Typography fontWeight='bold'>
              ¡Hay tutoriales distintos en cada vista!
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    selector: '#tour-fab-button',
    position: 'center',
    padding: 0,
    stepInteraction: false,
  },
];

export default AdventureSelectionOnboarding;
