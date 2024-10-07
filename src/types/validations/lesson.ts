import * as Yup from 'yup';

export const CreateLessonSchema = Yup.object().shape({
  title: Yup.string().required(),
});

export const UpdateLessonSchema = Yup.object().shape({
  title: Yup.string().optional(),
  classroom_id: Yup.number().optional(),
  unit_id: Yup.number().optional(),
  started_at: Yup.string().optional(),
  ended_at: Yup.string().optional(),
});
