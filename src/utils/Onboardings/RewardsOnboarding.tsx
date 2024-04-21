import { Typography } from '@mui/material';
import OnboardingContent from 'components/OnboardingContent';

const RewardsOnboarding = [
  {
    content: () => {
      return (
        <OnboardingContent title='Gestión de Recompensas'>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Las <b>recompensas</b> son un elemento vital para mantener la{' '}
              <b>motivación</b> de tus estudiantes a tope.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    selector: '#rewards-list',
    position: 'top',
    padding: 8,
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Las recompensas se obtienen de forma <b>automática</b> al alcanzar
              el <b>puntaje</b> indicado
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    position: 'top',
    padding: 8,
    selector: '#reward-card-0',
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              En este caso, cuando tus estudiantes alcancen <b>40 puntos</b>,
              obtendrán la <b>primera recompensa</b>.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#reward-card-points-0',
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Puedes editar las recompensas presionando el botón “Editar”. El
              contenido de ellas queda a tu criterio.{' '}
            </Typography>
            <Typography variant='body1' component='p' fontWeight='bold'>
              ¡Una manera divertida de elegirlas es hacerlo junto a tus
              estudiantes!
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#reward-card-edit-0',
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Algunas sugerencias de recompensa pueden ser desde cambiarse de
              puesto, tener un día adicional para entregar una tarea, poder
              comer en clases, una anotación positiva o un reconocimiento en el
              diario mural.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#reward-card-edit-0',
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Cuando tus estudiantes obtengan recompensas, lo verás reflejado en
              este indicador
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#reward-card-indicator-0',
    stepInteraction: false,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('reward-modal-cancel')?.click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Cuando tus estudiantes <b>utilicen</b> sus recompensas, querrás
              llevar un <b>registro</b> de quienes ya las han utilizado
            </Typography>
            <Typography variant='body1' component='p'>
              Para lograrlo, puedes utilizar el{' '}
              <b>panel de canjeo de recompensas</b>, que se abre al hacer click
              en alguna de ellas.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#reward-card-0',
    stepInteraction: false,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('reward-card-0')?.click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              En este panel verás los estudiantes que tienen la{' '}
              <b>recompensa disponible</b>. En la lista, debes marcar los
              estudiantes que <b>ya han utilizado su recompensa</b>.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#reward-modal-list',
    stepInteraction: false,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('reward-card-0')?.click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Finalmente, se debe presionar el botón <b>“Guardar Cambios</b>{' '}
              para guardar el registro.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    selector: '#reward-modal-save',
    stepInteraction: false,
  },
  {
    action: (element: HTMLElement) =>
      document.getElementById('reward-modal-cancel')?.click(),
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

export default RewardsOnboarding;
