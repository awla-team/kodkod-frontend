import * as Yup from 'yup';

export interface CreateReward {
  name: string;
  description: string;
}

export const CreateRewardSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'El nombre es requerido')
    .max(255, 'El nombre es demasiado largo')
    .required('El nombre es requerido'),
  description: Yup.string().required('La descripción es requerida'),
});
