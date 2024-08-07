import * as Yup from 'yup';

export const CreateActivitySchema = Yup.object().shape({
  title: Yup.string()
    .min(1, 'El titulo es requerido')
    .max(255, 'El titulo es demasiado largo')
    .required('El título es requerido'),
  description: Yup.string().required('La descripción es requerida'),
});

export interface CreateRewardFormValues {
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
