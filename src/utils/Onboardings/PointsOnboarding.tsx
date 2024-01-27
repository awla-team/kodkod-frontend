import { Typography } from '@mui/material';
import OnboardingContent from 'components/OnboardingContent';

const PointsOnboarding = [
  {
    content: () => {
      return (
        <OnboardingContent title='Misiones y puntaje'>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Las misiones son <b>interacciones positivas</b> que los
              estudiantes deben realizar <b>durante la clase.</b>
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#adventure-missions',
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Están compuestas por un <b>título</b> y una{' '}
              <b>descripción de la interacción positiva</b> a realizar.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#mission-content-0',
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Además, las misiones están asociadas a{' '}
              <b>habilidades específicas</b> que queremos desarrollar en
              nuestros estudiantes.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#mission-skill-0',
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              También tienen un <b>puntaje</b>, que depende de la{' '}
              <b>dificultad de la misión</b>. Este puntaje se le otorga a
              aquellos estudiantes que la completan, y les permitirá{' '}
              <b>desbloquear recompensas.</b>
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#mission-points-0',
    stepInteraction: false,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('mission-complete-modal-cancel')?.click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Cuando alguno de tus estudiantes complete una misión, puedes hacer
              click en ella para abrir el <b>panel de puntajes.</b>
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#mission-card-0',
    stepInteraction: false,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('mission-card-0')?.click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              En él, puedes registrar aquellos estudiantes que han terminado la
              misión.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#mission-complete-modal-list',
    stepInteraction: false,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('mission-card-0')?.click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Incluso puedes <b>seleccionarlos a todos</b> rápidamente si es que
              todo el curso completó la misión
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#mission-complete-modal-all',
    stepInteraction: false,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('mission-card-0')?.click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Finalmente, se debe presionar el botón <b>"Guardar Cambios"</b>{' '}
              para guardar el registro.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#mission-complete-modal-save',
    stepInteraction: false,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('mission-complete-modal-cancel')?.click(),
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
    padding: 8,
    stepInteraction: false,
  },
];

export default PointsOnboarding;
