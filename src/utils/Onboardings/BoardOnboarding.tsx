import { Typography } from '@mui/material';
import OnboardingContent from 'components/OnboardingContent';

const BoardOnboarding = [
  {
    content: () => {
      return (
        <OnboardingContent title='El Tablero del curso'>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              Cuando ingresas a uno de tus cursos, te encontrarás con la vista
              de Tablero.
            </Typography>
            <Typography variant='body1' component='p'>
              Está compuesto por 3 secciones:
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
        <OnboardingContent title='Resumen de la aventura'>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              La sección de <b>“Resumen”</b> te muestra el grado de avance del
              curso en una aventura.
            </Typography>
            <Typography variant='body1' component='p'>
              Si aún no seleccionas una, te enseñaremos a hacerlo en la vista de
              “Aventura”.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#board-onboarding-1',
    padding: 0,
  },
  {
    content: () => {
      return (
        <OnboardingContent title='Lista de estudiantes'>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              La sección <b>“Lista de estudiantes”</b> te permite gestionar los
              estudiantes asociados a tu curso.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#board-onboarding-2',
    padding: 0,
  },
  {
    content: () => {
      return (
        <OnboardingContent title='Termómetro socioemocional'>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              Finalmente, la sección “Termómetro Socioemocional”, te presenta
              una pequeña encuesta que debe ser respondida al final de cada
              clase.
            </Typography>
            <Typography variant='body1' component='p'>
              Con los datos de esta sección, <b>generaremos reportes</b> que te{' '}
              <b>ayudarán a mejorar el clima escolar</b> de tu clase.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#board-onboarding-3',
    padding: 0,
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

export default BoardOnboarding;
