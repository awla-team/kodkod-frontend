import { Typography } from '@mui/material';
import OnboardingContent from 'components/OnboardingContent';

const StudentListOnboarding = [
  {
    content: () => {
      return (
        <OnboardingContent title='Gestión de estudiantes'>
          <div className='d-flex flex-column gap-2'>
            <Typography variant='body1' component='p'>
              La sección “Lista de estudiantes” te permite gestionar los
              estudiantes asociados a tu curso.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 0,
    stepInteraction: false,
    selector: '#board-onboarding-2', //#student-list-onboarding-0
    position: 'left',
  },
  {
    action: () => document.getElementById('add-students-cancel')?.click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              El botón <b>“Añadir estudiantes”</b> te permite abrir el panel
              para añadir estudiantes
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#student-list-onboarding-1',
    padding: 0,
  },
  {
    action: () => document.getElementById('student-list-onboarding-1').click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              En este panel podrás cargar estudiantes de dos formas:
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#student-list-onboarding-2',
    position: 'center',
    padding: 0,
  },
  {
    action: () => document.getElementById('student-list-onboarding-1').click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              1) Subiendo un archivo excel con la lista de tus estudiantes.
              Debes utilizar la plantilla excel para evitar errores.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#student-list-onboarding-3',
    padding: 0,
  },
  {
    action: () => document.getElementById('student-list-onboarding-1').click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              2) Ingresándolos manualmente. Solo debes ingresar Nombres,
              Apellidos e Emails
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#student-list-onboarding-4',
    padding: 0,
  },
  {
    action: () => document.getElementById('student-list-onboarding-1').click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              Una vez que hayas cargado tus estudiantes por alguno de los dos
              métodos, deberás hacer click en <b>“Añadir estudiantes”</b> para
              finalizar el proceso.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#student-list-onboarding-5',
    padding: 0,
  },
  {
    action: () => document.getElementById('add-students-cancel')?.click(),
    content: () => {
      return (
        <OnboardingContent>
          <div className='d-flex flex-column gap-3'>
            <Typography variant='body1' component='p'>
              Verás los estudiantes cargados en esta sección, donde además
              podrás <b>editarlos</b> o <b>removerlos</b> del curso si lo
              necesitas.
            </Typography>
          </div>
        </OnboardingContent>
      );
    },
    stepInteraction: false,
    selector: '#board-onboarding-2', //#student-list-onboarding-0
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

export default StudentListOnboarding;
