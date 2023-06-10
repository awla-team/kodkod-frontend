import http from '../global/api';

export const startSubscription = (body: {
  preapproval_plan_id: string;
  payer_email: string;
  back_url: string;
  card_token_id?: string;
}) => http.post('subscription/start', body);

export const getPlans = () => http.get('subscription/plans');

export const findSubscription = () => http.get('subscription/find');

export const cancelSubscription = (subscriptionId: number | string) =>
  http.put(`subscription/cancel/${subscriptionId}`);
