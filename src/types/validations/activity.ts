import * as Yup from 'yup';

export const CreateActivitySchema = Yup.object().shape({
  title: Yup.string()
    .min(1, 'El titulo es requerido')
    .max(50, 'El titulo es demasiado largo')
    .required('El título es requerido'),
  description: Yup.string().required('La descripción es requerida'),
});
