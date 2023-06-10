import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Payment } from '@mercadopago/sdk-react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import {
  cancelSubscription,
  findSubscription,
  getPlans,
  startSubscription,
} from 'services/subscriptions';
import { useAuth } from 'contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FetchStatus } from 'global/enums';
import { IPlan, ISubscription } from 'global/interfaces';
import ConfirmationModal from 'components/Modals/ConfirmationModal';
import moment from 'moment';
import Toaster from 'utils/Toster';

const subscriptionStatus: any = {
  pending: {
    text: 'Validando pago',
    color: 'warning',
  },
  authorized: {
    text: 'Suscripción activa',
    color: 'success',
  },
  error: {
    text: 'Error en el pago',
    color: 'error',
  },
  cancelled: {
    text: 'Subscripción cancelada',
    color: 'default',
  },
};

const Subscriptions: React.FC = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [currentSubscription, setCurrentSubscription] = useState<ISubscription>();
  const [openModal, setOpenModal] = useState(false);
  const [fetching, setFetching] = useState<FetchStatus>(FetchStatus.Idle);
  const [formLoading, setFormLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setFetching(FetchStatus.Pending);
      try {
        const plansResponse = await getPlans();
        setPlans(
          plansResponse.data.results.sort((a: IPlan, b: IPlan) => {
            if (a.reason > b.reason) return -1;
            if (a.reason < b.reason) return 1;
            return 0;
          })
        );
        setFetching(FetchStatus.Success);
      } catch (error) {
        console.log(error);
        setFetching(FetchStatus.Error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user.payer_id) {
        setFetching(FetchStatus.Pending);
        try {
          const subscriptionResponse = await findSubscription();
          setCurrentSubscription(subscriptionResponse.data.results[0]);
          setFetching(FetchStatus.Success);
        } catch (error) {
          console.log(error);
          setFetching(FetchStatus.Error);
        }
      }
    })();
  }, [user]);

  const handleSubmit = async (token: string) => {
    setFetching(FetchStatus.Pending);
    try {
      const response = await startSubscription({
        preapproval_plan_id: selectedPlan,
        back_url: 'https://www.google.cl',
        payer_email: user.email,
        card_token_id: token,
      });
      setCurrentSubscription(response.data);
      Toaster('success', 'Felicitaciones! Ya eres miembro Pro!');
      setFetching(FetchStatus.Success);
      window.location.reload();
    } catch (error: any) {
      setFetching(FetchStatus.Error);
      console.log(error);
      Toaster(
        'error',
        error.response.data.message || 'Ha ocurrido un error al procesar la suscripción'
      );
      console.log(error);
      return error;
    }
  };

  const handleCancelSubscription = async () => {
    setFetching(FetchStatus.Pending);
    try {
      const response = await cancelSubscription(currentSubscription.id);
      setCurrentSubscription(response.data);
      Toaster('success', 'Cancelaste tu suscripción exitosamente');
      setOpenModal(false);
      setFetching(FetchStatus.Success);
      window.location.reload();
    } catch (error: any) {
      setFetching(FetchStatus.Error);
      Toaster(
        'error',
        error.response.data.message || 'Ha ocurrido un error al procesar la suscripción'
      );
      console.log(error);
      return error;
    }
  };

  return (
    <SubscriptionsContainer>
      <SubscriptionsBox className="p-5">
        <Typography className="mb-4" variant="h4" fontWeight="bold">
          Mis suscripciones
        </Typography>
        <Typography className="mb-2">
          ¡Suscríbete ya mismo a <b>Kodkod Pro</b> y accede a nuevas funciones y características que
          te ayudaran a convertir tu clase en un ambiente de sana convivencia!
        </Typography>
        <Typography>
          Con <b>Kodkod Pro</b> podrás:
        </Typography>
        <ul>
          <li>Crear cursos ilimitados de distintos niveles</li>
          <li>Acceder a TODAS las aventuras (¡incluyendo las que salgan a futuro!)</li>
          <li>Reemplazar misiones de aventuras</li>
          <li>Soporte preferencial</li>
          <li>¡Acceso anticipado a TODAS las nuevas funcionalidades que vienen en camino!</li>
        </ul>
        {fetching !== FetchStatus.Pending && fetching !== FetchStatus.Idle ? (
          <>
            {currentSubscription && user.is_subscription_active ? (
              <ActiveSubscriptionBox className="d-flex justify-content-between align-items-center p-4">
                <div>
                  <Chip
                    className="mb-3"
                    color={subscriptionStatus[currentSubscription.status].color}
                    label={subscriptionStatus[currentSubscription.status].text}
                  />
                  <div className="d-flex flex-column gap-2">
                    <Typography variant="h6" fontWeight="bold">
                      {currentSubscription.reason}
                    </Typography>
                    <Typography>{`$${currentSubscription.auto_recurring.transaction_amount.toLocaleString()}/${
                      currentSubscription.auto_recurring.frequency === 1 ? 'mes' : 'año'
                    }`}</Typography>
                    <Typography variant="body2">{`${
                      currentSubscription.status !== 'cancelled'
                        ? 'Próxima facturación:'
                        : 'Finaliza el:'
                    } ${moment(user.subscription_end).format('DD-MM-yyyy')}`}</Typography>
                  </div>
                </div>
                {currentSubscription.status !== 'cancelled' ? (
                  <div className="d-flex flex-column gap-2">
                    <Button
                      component={Link}
                      target="_blank"
                      to={currentSubscription.init_point}
                      variant="contained"
                    >
                      Actualizar método de pago
                    </Button>
                    <Button onClick={() => setOpenModal(true)} size="small">
                      Cancelar suscripción
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex flex-column">
                    <Typography variant="caption">
                      Seguirás teniendo Kodkod Pro hasta el{' '}
                      {moment(user.subscription_end).format('DD-MM-yyyy')}
                    </Typography>
                    <Typography variant="caption" fontWeight="bold">
                      ¡Puedes suscribirte de nuevo después de esta fecha!
                    </Typography>
                  </div>
                )}
              </ActiveSubscriptionBox>
            ) : null}
            {!user.is_subscription_active ? (
              <Box className="d-flex flex-column align-items-center">
                <div>
                  <Typography textAlign="center" className="mb-2">
                    Selecciona un plan de suscripción
                  </Typography>
                  <RadioGroup
                    name="plans"
                    row
                    value={selectedPlan}
                    onChange={(e) => {
                      setSelectedPlan(e.target.value);
                      setFormLoading(true);
                    }}
                    sx={{ justifyContent: 'center' }}
                    className="d-flex gap-2 mb-4"
                  >
                    {plans.map((plan, i) => (
                      <BoxControlLabel
                        key={`plan-option-${i}`}
                        disabled={!!selectedPlan && formLoading}
                        value={plan.id}
                        label={
                          <div className="d-flex flex-column align-items-center">
                            <Typography>{plan.reason}</Typography>
                            <div className="d-flex align-items-center gap-1">
                              <Typography
                                fontWeight="bold"
                                variant="h5"
                              >{`$${plan.auto_recurring.transaction_amount.toLocaleString()}`}</Typography>
                              {/*entry[1].old_price ? <Typography variant="body2" color="gray" sx={{ textDecoration: 'line-through' }}>{`$${entry[1].old_price.toLocaleString()}`}</Typography> : null*/}
                            </div>
                          </div>
                        }
                        control={<Radio />}
                      />
                    ))}
                  </RadioGroup>
                </div>
                {selectedPlan && formLoading ? <CircularProgress className="mb-4" /> : null}
                {selectedPlan && plans.length ? (
                  <div className="d-flex flex-column align-items-center flex-fill w-100">
                    <Payment
                      onReady={() => setFormLoading(false)}
                      initialization={{
                        amount: plans.find((plan) => plan.id === selectedPlan)?.auto_recurring
                          .transaction_amount,
                        payer: {
                          email: user.email,
                        },
                      }}
                      customization={{
                        paymentMethods: {
                          creditCard: 'all',
                          debitCard: 'all',
                          mercadoPago: 'all',
                          maxInstallments: 1,
                        },
                        visual: {
                          hideFormTitle: true,
                          defaultPaymentOption: {
                            creditCardForm: true,
                          },
                          style: {
                            customVariables: {
                              successColor: 'transparent',
                            },
                          },
                        },
                      }}
                      onSubmit={async (param) => {
                        handleSubmit(param.formData.token);
                      }}
                    />
                    {!formLoading ? (
                      <Typography variant="body2">
                        Tu comprobante de suscripción llegará a tu correo electrónico asociado a tu
                        cuenta Kodkod.
                      </Typography>
                    ) : null}
                  </div>
                ) : null}
              </Box>
            ) : null}
          </>
        ) : (
          <div className="d-flex align-items-center justify-content-center p-5">
            <CircularProgress />
          </div>
        )}
      </SubscriptionsBox>
      <ConfirmationModal
        title="¿Estás seguro de cancelar tu suscripción?"
        open={openModal}
        callBackFunction={handleCancelSubscription}
        confirmText="Sí, quiero cancelar mi suscripción"
        onClose={() => setOpenModal(false)}
        description="Esta acción pondrá fin a tu plan Pro. Podrás suscribirte nuevamente en el futuro si lo deseas."
      />
    </SubscriptionsContainer>
  );
};

const BoxControlLabel = styled(FormControlLabel)`
  height: 200px;
  width: 300px;
  border: 1px solid gray;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
`;

const SubscriptionsBox = styled(Box)`
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid rgba(33, 33, 33, 0.08);
  width: 100%;

  a:hover {
    color: #fff;
  }

  #paymentBrick_container {
    width: 100%;
  }
`;

const ActiveSubscriptionBox = styled(Box)`
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid rgba(33, 33, 33, 0.08);
  width: 100%;
`;

const SubscriptionsContainer = styled.div`
  padding: 36px 0;
  width: 100%;
`;

export default Subscriptions;
