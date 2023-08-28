import { Typography } from "@mui/material";
import OnboardingContent from "components/OnboardingContent";

const EmotionalThermometerOnboarding = [
  {
    content: () => {
      return (
        <OnboardingContent title="El Termómetro Socioemocional">
          <div className="d-flex flex-column gap-2">
            <Typography variant="body1" component="p">En la sección “Termómetro socioemocional”, encontrarás una pequeña encuesta que debes completar al final de cada clase. </Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 0,
    stepInteraction: false,
    selector: '#board-onboarding-3' //'#thermometer-onboarding-0'
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className="d-flex flex-column gap-2">
            <Typography variant="body1" component="p">Para empezar, asegúrate de que estás completando el registro de la fecha correcta.</Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    stepInteraction: false,
    selector: '#thermometer-onboarding-1',
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className="d-flex flex-column gap-2">
            <Typography variant="body1" component="p">Luego, ingresa tus respuestas a las preguntas.</Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 24,
    stepInteraction: false,
    selector: '#thermometer-onboarding-2',
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className="d-flex flex-column gap-2">
            <Typography variant="body1" component="p">Finalmente, haz click en el botón “Guardar termómetro socioemocional”</Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    stepInteraction: false,
    selector: '#thermometer-onboarding-3',
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className="d-flex flex-column gap-2">
            <Typography variant="body1" component="p">Puedes editar registros anteriores de <b>hasta hace un mes</b> navegando a través del botón de calendario.</Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 8,
    stepInteraction: false,
    selector: '#thermometer-onboarding-4',
  },
  {
    content: () => {
      return (
        <OnboardingContent>
          <div className="d-flex flex-column gap-2">
            <Typography variant="body1" component="p">¡Listo! Recuerda que utilizamos esta información para entregar reportes que te ayuden a <b>mejorar el clima escolar de tu clase.</b></Typography>
            <Typography variant="body1" component="p"><b>¡Mientras más lo uses, obtendrás mejores reportes!</b></Typography>
          </div>
        </OnboardingContent>
      );
    },
    padding: 0,
    stepInteraction: false,
    selector: '#reports-tab', //'#thermometer-onboarding-5'
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
  
export default EmotionalThermometerOnboarding;