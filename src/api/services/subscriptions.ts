import http from '../api';

export const startSubscription = async (body: {
  preapproval_plan_id: string;
  payer_email: string;
  back_url: string;
  card_token_id?: string;
}) => await http.post('subscription/start', body);

export const getPlans = async () => await http.get('subscription/plans');

export const findSubscription = async () => await http.get('subscription/find');

export const cancelSubscription = async (subscriptionId: number | string) =>
  await http.put(`subscription/cancel/${subscriptionId}`);
