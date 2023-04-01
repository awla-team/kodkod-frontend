import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { FetchStatus } from "global/enums";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ForgotPasswordCard,
  ForgotPasswordContainer,
} from "../ForgotPassword/styled";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Toaster from "utils/Toster";
import { resendEmailVerification, verifyEmail } from "services/auth";

const CustomCard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ForgotPasswordContainer className="d-flex flex-column">
      <ForgotPasswordCard variant="outlined">
        <CardContent className="p-5">{children}</CardContent>
      </ForgotPasswordCard>
    </ForgotPasswordContainer>
  );
};

const VerifyEmail: React.FC = () => {
  const { token, userId } = useParams();
  const [emailVerified, setEmailVerified] = useState(FetchStatus.Idle);
  const [emailResend, setEmailSend] = useState(FetchStatus.Idle);

  useEffect(() => {
    setEmailVerified(FetchStatus.Pending);
    verifyEmail(token)
      .then((_response) => {
        setEmailVerified(FetchStatus.Success);
        // Toaster("success", "You will get a verification email!");
      })
      .catch((error) => {
        console.error(error);
        setEmailVerified(FetchStatus.Error);
        // Toaster("error", "Ha ocurrido un error");
      });
  }, [token]);

  const sendEmailVerification = () => {
    setEmailSend(FetchStatus.Pending);
    resendEmailVerification(userId)
      .then((_response) => {
        setEmailSend(FetchStatus.Success);
        Toaster("success", "Se ha enviado un nuevo link a tu email");
      })
      .catch((error) => {
        console.error(error);
        setEmailSend(FetchStatus.Error);
        Toaster("error", "Ha ocurrido un error al enviar el link");
      });
  };

  if (
    emailVerified === FetchStatus.Idle ||
    emailVerified === FetchStatus.Pending
  )
    return (
      <div className="d-flex w-100 h-100 justify-content-center align-items-center">
        <CircularProgress />
      </div>
    );

  if (emailVerified === FetchStatus.Error)
    return (
      <CustomCard>
        <Button
          className="mb-2"
          startIcon={<ArrowBackIosIcon />}
          component={RouterLink}
          to="/signin"
        >
          Volver al inicio de sesión
        </Button>
        <Typography component="h4" variant="h5" className="mb-1">
          Ha ocurrido un error
        </Typography>
        <Typography component="span" variant="body2" color="gray">
          El link de verificación ha expirado. Puedes hacer clic en el botón "
          <b>Reenviar link de verificación</b>" para enviar un nuevo link a tu
          email.
        </Typography>
        <Box
          className="action__container"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1}
          mt={2}
        >
          <Button
            disabled={
              emailResend === FetchStatus.Pending ||
              emailResend === FetchStatus.Success
            }
            fullWidth
            size="large"
            className="submit__button"
            variant="contained"
            onClick={sendEmailVerification}
          >
            {emailResend === FetchStatus.Pending ? (
              <CircularProgress />
            ) : (
              "Reenviar link de verificación"
            )}
          </Button>
        </Box>
      </CustomCard>
    );

  return (
    <CustomCard>
      <Button
        className="mb-2"
        startIcon={<ArrowBackIosIcon />}
        component={RouterLink}
        to="/signin"
      >
        Volver al inicio de sesión
      </Button>
      <Typography component="h4" variant="h5" className="mb-1">
        Tu email ha sido verificado con exito
      </Typography>
      <Typography component="span" variant="body2" color="gray">
        Ahora podrás usar kodkod sin problemas
      </Typography>
    </CustomCard>
  );
};

export default VerifyEmail;
