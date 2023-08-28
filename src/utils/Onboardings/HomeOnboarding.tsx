import { Typography } from "@mui/material";
import OnboardingContent from "components/OnboardingContent";

const HomeOnboarding = [
  {
    content: () => {
      return (
        <OnboardingContent title="¡Bienvenid@ a Kodkod!">
          <div className="d-flex flex-column gap-2">
            <Typography variant="body1" component="p">Kodkod es una plataforma que te ayudará a mejorar el clima escolar en tu sala de clases</Typography>
            <Typography variant="body1" component="p">¡La dinámica es muy simple!</Typography>
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
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-2">
              <Typography variant="body1" component="p">1) Tus estudiantes completan misiones que mejoran sus habilidades socioemocionales y cognitivas</Typography>
              <Typography variant="body1" component="p">2) Obtienen recompensas que aumentan su motivación y disposición al aprendizaje</Typography>
              <Typography variant="body1" component="p">3) Te ayudamos a identificar problemas y oportunidades con reportes y alertas</Typography>
            </div>
            <Typography variant="body1" component="p" fontWeight="bold">¿Estás list@ para comenzar?</Typography>
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
          <Typography>El botón <b>“+”</b> de la barra lateral te permite abrir el cuadro de "Añadir cursos".</Typography>
        </OnboardingContent>
      );
    },
    selector: '#home-onboarding-2',
    padding: 0,
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className="d-flex flex-column gap-2">
            <Typography>Al abrirse, deberás ingresar el nivel y el nombre del curso que quieres agregar.</Typography>
            <Typography>Cuando estés list@, presiona el botón <b>"Añade un nuevo curso"</b>.</Typography>
            <Typography variant="caption">Ej: Si quieres crear el curso 1° Medio A, deberías seleccionar el nivel 1° Medio, e ingresar “A” en el campo de curso.</Typography>
          </div>
        </OnboardingContent>
      );
    },
    action: (element: HTMLElement) => {
      document.getElementById('home-onboarding-2')?.click();
    },
    actionAfter: () => {
      document.getElementById('create-class-cancel')?.click();
    },
    selector: '#home-onboarding-3',
    position: 'left',
    padding: 0,
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className="d-flex flex-column gap-2">
            <Typography>Cada vez que añadas un curso, lo verás en la sección de <b>“Mis cursos”.</b></Typography>
          </div>
        </OnboardingContent>
      );
    },
    selector: '#home-onboarding-4',
    stepInteraction: false,
    disableActions: false,
    padding: 0,
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className="d-flex flex-column gap-2">
            <Typography>También puedes navegar entre tus cursos a través de la barra de navegación lateral.</Typography>
          </div>
        </OnboardingContent>
      );
    },
    selector: '#home-onboarding-5',
    position: 'right',
    padding: 0,
    stepInteraction: false,
  },
  {
    content: () => {
      return (
        <OnboardingContent title="¡Tutorial completado!">
          <div className="d-flex flex-column gap-2">
            <Typography>Recuerda que puedes acceder a este y otros tutoriales presionando el botón de ayuda.</Typography>
            <Typography fontWeight="bold">¡Hay tutoriales distintos en cada vista!</Typography>
          </div>
        </OnboardingContent>
      );
    },
    selector: '#tour-fab-button',
    position: 'center',
    padding: 0,
    stepInteraction: false,
  }
];
  
export default HomeOnboarding;