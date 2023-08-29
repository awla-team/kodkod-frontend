import { Typography } from '@mui/material';
import OnboardingContent from 'components/OnboardingContent';

const ProgressOnboarding = [
  {
    content: () => {
      return (
        <OnboardingContent title="Progreso del curso">
          <div className="d-flex flex-column gap-2">
            <Typography variant="body1" component="p">
              La vista de <b>progreso</b> te permite ver el{' '}
              <b>desarrollo de tu curso y tus estudiantes</b> a lo largo de la
              aventura.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    position: 'center',
    padding: 8,
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className="d-flex flex-column gap-2">
            <Typography variant="body1" component="p">
              Primero, nos indica <b>qué aventura</b> y en <b>qué etapa</b> se
              encuentra tu curso.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    selector: '#progress-adventure-details',
    padding: 8,
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className="d-flex flex-column gap-2">
            <Typography variant="body1" component="p">
              A continuación, nos indica el <b>porcentaje de avance</b> de tu
              curso respecto a la aventura
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    selector: '#progress-adventure-percentage',
    padding: 8,
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className="d-flex flex-column gap-2">
            <Typography variant="body1" component="p">
              Y en el recuadro siguiente, puedes ver cuántas{' '}
              <b>misiones en promedio</b> han completado tus estudiantes a lo
              largo de la aventura.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    selector: '#progress-adventure-avg',
    padding: 8,
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className="d-flex flex-column gap-2">
            <Typography variant="body1" component="p">
              Finalmente, en la tabla, podrás ver los detalles del avance{' '}
              <b>de cada estudiante</b> dentro de la aventura en curso.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    selector: '#progress-table',
    padding: 8,
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className="d-flex flex-column gap-2">
            <Typography variant="body1" component="p">
              Por defecto, están ordenados por apellido, pero puedes{' '}
              <b>ordenar la tabla</b> como quieras haciendo click en alguno de
              los <b>encabezados.</b>
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    selector: '#progress-table',
    padding: 8,
    position: 'top',
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent title="¡Tutorial completado!">
          <div className="d-flex flex-column gap-2">
            <Typography>
              Recuerda que puedes acceder a este y otros tutoriales presionando
              el botón de ayuda.
            </Typography>
            <Typography fontWeight="bold">
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

export default ProgressOnboarding;
