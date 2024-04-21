import { Typography } from '@mui/material';
import OnboardingContent from 'components/OnboardingContent';

const AdventureOnboarding = [
  {
    content: () => {
      return (
        <OnboardingContent title='Trabajando con una aventura'>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Aquí la dinámica es simple:
            </Typography>
            <Typography variant='body1' component='p'>
              Tú proyectas las misiones, los estudiantes las completan, avanzan
              de etapas y obtienen recompensas.
            </Typography>
            <Typography variant='body1' component='p'>
              Todo esto mientras aumentan su motivación y desarrollan
              habilidades transversales.
            </Typography>
            <Typography variant='body1' component='p'>
              Para entenderlas mejor, te mostraremos la estructura de una
              aventura.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 0,
    position: 'center',
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              En primer lugar, una aventura está compuesta por <b>etapas</b>.
              Las etapas nos permiten <b>dosificar el trabajo</b> temporalmente
              y avanzar al <b>ritmo de la clase</b>.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#adventure-stages',
    padding: 8,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              A su vez, las etapas están compuestas por <b>misiones</b>. Las
              misiones son <b>interacciones positivas</b> que los estudiantes
              deben realizar <b>durante la clase.</b>
            </Typography>
            <Typography variant='body1' component='p' fontWeight='bold'>
              ¡Te recomendamos proyectarlas al inicio de cada clase!
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#adventure-missions',
    padding: 8,
  },
  /* {
    content: () => {
      return (
        <OnboardingContent>
          <div className="d-flex flex-column gap-3">
            <Typography variant="body1" component="p">Si consideras que alguna de las misiones de la etapa no te serán útiles durante la clase, puedes seleccionar una nueva apretando el botón de <b>"Reemplazar misión"</b></Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#adventure-mission-change',
    padding: 8,
  }, */
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              Cuando veas que el curso ha completado la mayoría de las misiones
              de la etapa, puedes <b>desbloquear</b> la siguiente, con nuevas y
              divertidas misiones.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#adventure-stage-unlock',
    padding: 8,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              Desbloquear una nueva etapa queda a tu criterio ¡Pero no te
              preocupes!{' '}
              <b>
                Siempre podrás volver atrás y revisar las misiones de etapas
                anteriores
              </b>
              .
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#adventure-stages-stepper',
    padding: 8,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              Finalmente, cuando llegues a la última etapa, podrás ponerle fin a
              la aventura presionando el botón <b>“Finalizar aventura”</b>. Al
              hacerlo, te mostraremos un <b>resumen del trabajo realizado</b>{' '}
              por tus estudiantes.
            </Typography>
            <Typography variant='body1' component='p'>
              ¡Es una oportunidad genial para{' '}
              <b>
                proyectarlo frente al curso, reconocer el esfuerzo de tus
                estudiantes y darles retroalimentación
              </b>
              !
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#adventure-stages-stepper',
    padding: 8,
  },
  {
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

export default AdventureOnboarding;
