import type { FC } from 'react';
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { SubscriptionImg } from './styled';

const SubscribeModal: FC<{ open: boolean; onClose: () => void; reason: string }> = ({
  open,
  onClose,
  reason = 'Conviertete en un miembro Pro',
}) => {
  return (
    <Dialog open={open} PaperProps={{ className: 'p-3' }} maxWidth="md">
      <DialogTitle fontWeight="bold">{reason}</DialogTitle>
      <DialogContent dividers className="py-5">
        <div className="d-flex flex-column flex-lg-row gap-4 align-items-center">
          <div>
            <SubscriptionImg src={null} />
          </div>
          <div>
            <Typography className="mb-2">
              ¡Suscríbete ya mismo a <b>Kodkod Pro</b> y accede a nuevas funciones y características
              que te ayudaran a convertir tu clase en un ambiente de sana convivencia!
            </Typography>
            <Typography>
              Con <b>Kodkod Pro</b> podrás:
            </Typography>
            <ul>
              <li>Crear múltiples cursos de distintos niveles</li>
              <li>Acceder a nuevas y fascinantes aventuras</li>
              <li>Reemplazar misiones de aventuras</li>
              <li>Editar las recompensas del curso</li>
              <li>Soporte preferencial</li>
              <li>¡Acceso anticipado a TODAS las nuevas funcionalidades que vienen en camino!</li>
            </ul>
            <Typography fontWeight="bold">
              ¿Qué estás esperando? Visita la página de suscripciones y elige la que más te convenga
            </Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="pt-3 gap-2">
        <Button variant="outlined" onClick={() => onClose()}>
          Cerrar
        </Button>
        <Button
          sx={{ '&:hover': { color: '#fff' } }}
          component={Link}
          to="/app/perfil/suscripciones"
          onClick={() => onClose()}
          variant="contained"
        >
          Suscribirse a Kodkod Pro
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscribeModal;
