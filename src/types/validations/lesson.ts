import * as Yup from 'yup';

export const CreateLessonSchema = Yup.object().shape({
  title: Yup.string().required(),
});
