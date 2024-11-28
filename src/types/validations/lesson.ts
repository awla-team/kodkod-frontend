import * as Yup from 'yup';

export const CreateLessonSchema = Yup.object().shape({
  title: Yup.string().required(),
  goal: Yup.string().optional().max(65535, {
    message: 'Haz superado el límite de caracteres',
  }),
});

export const UpdateLessonSchema = Yup.object().shape({
  title: Yup.string().optional(),
  classroom_id: Yup.number().optional(),
  unit_id: Yup.number().optional(),
  started_at: Yup.string().optional(),
  ended_at: Yup.string().optional(),
});
