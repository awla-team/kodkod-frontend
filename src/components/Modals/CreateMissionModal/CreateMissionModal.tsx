import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useModalStore } from 'contexts/ZustandContext/modal-context';
import kodcoinIcon from 'assets/images/kodcoin.png';
import { getSkills } from 'services/skills';
import { type IStage, type IMission, type ISkill } from 'global/interfaces';
import { Formik, type FormikHelpers } from 'formik';
import {
  type CreateMissionAndReplace,
  createMissionAndReplace,
  MissionTypeEnum,
} from 'services/missions';
import Toaster from 'utils/Toster';

interface FormInput {
  title: string;
  description: string;
  difficulty: string;
  skill: string;
}

interface Props {
  mission: IMission;
  stage: IStage;
  updateMissions: () => void;
}

const CreateMissionModal = ({ mission, stage, updateMissions }: Props) => {
  const { closeModal } = useModalStore();
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [points, setPoints] = useState<number>(10);
  const [formValues] = useState<FormInput>({
    title: '',
    description: '',
    difficulty: 'facil',
    skill: '0',
  });

  const fetchSkills = useCallback(async () => {
    try {
      const {
        status,
        data: { responseData },
      } = await getSkills();
      if (status === 200) {
        setSkills(responseData);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchSkills();
  }, [fetchSkills]);

  const onSubmit = async (values: FormInput) => {
    try {
      const dto: CreateMissionAndReplace = {
        old_mission: {
          id_stage: stage.id,
          old_mission_id: mission.id as number,
        },
        new_mission: {
          id_skill: Number(values.skill),
          title: values.title,
          description: values.description,
          difficulty: values.difficulty,
          points,
          custom: true,
          type: MissionTypeEnum.NORMAL,
        },
      };
      const { status } = await createMissionAndReplace(dto);

      if (status === 200) {
        Toaster('success', 'Misión creada y reemplazada exitosamente');
        updateMissions();
        closeModal();
      }
    } catch (e) {
      console.log(e);
      Toaster('error', 'Error al crear y reemplazar misión');
    }
  };

  return (
    <Formik initialValues={formValues} onSubmit={onSubmit}>
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          onSubmit={handleSubmit}
        >
          <Typography variant='body2' className='mb-2'>
            Completa la información de la misión que deseas crear.
          </Typography>

          <Box display='flex' gap={2}>
            <Box display='flex' flexDirection='column' gap={2} flexGrow={1}>
              <TextField
                value={values.title}
                onChange={handleChange}
                size='small'
                name='title'
                variant='outlined'
                placeholder='Nombre de la mision'
                fullWidth
              />
              <TextField
                value={values.description}
                onChange={handleChange}
                size='small'
                name='description'
                variant='outlined'
                placeholder='Descripcion de la mision'
                fullWidth
                multiline
                maxRows={4}
              />
              <Box display='flex' gap={1}>
                <TextField
                  size='small'
                  name='difficulty'
                  variant='outlined'
                  placeholder='Dificultad'
                  style={{ flexGrow: 1 }}
                  select
                  onChange={(e) => {
                    handleChange(e);
                    const value = e.target.value;
                    if (value === 'easy') {
                      setPoints(10);
                    } else if (value === 'normal') {
                      setPoints(20);
                    } else if (value === 'hard') {
                      setPoints(30);
                    }
                  }}
                  value={values.difficulty}
                  defaultValue={values.difficulty}
                >
                  <MenuItem value='hard'>Dificil</MenuItem>
                  <MenuItem value='normal'>Normal</MenuItem>
                  <MenuItem value='easy'>Facil</MenuItem>
                </TextField>
                <TextField
                  size='small'
                  name='skill'
                  variant='outlined'
                  placeholder='Habilidad'
                  style={{ flexGrow: 1 }}
                  select
                  onChange={handleChange}
                  value={values.skill}
                  defaultValue={values.skill}
                >
                  <MenuItem value='0'>Seleccionar</MenuItem>
                  {skills.map((skill) => (
                    <MenuItem key={skill.id} value={skill.id}>
                      {skill.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
            <Box
              flexGrow={1}
              display='flex'
              alignItems='center'
              justifyContent='center'
              sx={{ border: '1px solid rgba(112, 112, 112, 0.5);' }}
              width={100}
            >
              <Box display='flex' justifyContent='center' gap={1}>
                <img
                  src={kodcoinIcon}
                  style={{ width: '40px', objectFit: 'cover' }}
                />
                <Typography variant='h4'>{points}</Typography>
              </Box>
            </Box>
          </Box>

          <Box display='flex' gap={1} justifyContent='flex-end'>
            <Button variant='outlined' onClick={closeModal}>
              Cancelar
            </Button>
            <Button variant='contained' type='submit' disabled={isSubmitting}>
              Crear mision
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default CreateMissionModal;
