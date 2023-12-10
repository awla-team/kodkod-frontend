import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Drawer,
  Typography,
} from '@mui/material';
import http from 'global/api';
import { type IUserHasReward } from 'global/interfaces';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { studentsRedeemReward } from 'services/rewards';
import Toaster from 'utils/Toster';
import StaticRewardCard from './StaticRewardCard';
import { StudentListContainer } from 'components/StudentsList/styled';

const RedeemRewardDrawer = ({
  openDrawer,
  onCloseDrawer,
  rewardId,
  icon,
  title,
  description,
  order,
}: {
  openDrawer: boolean;
  onCloseDrawer: () => void;
  rewardId: number;
  icon: string;
  title: string;
  description: string;
  order?: number;
}) => {
  const { classId } = useParams();
  const [selected, setSelected] = useState<number[]>([]);
  const [defaultSelected, setDefaultSelected] = useState<number[]>([]);
  const [students, setStudents] = useState([]);
  const [studentList, setStudentList] = useState([]);

  const onClose = () => {
    onCloseDrawer();
    setTimeout(() => {
      setSelected([]);
      setDefaultSelected([]);
      setStudents([]);
      setStudentList([]);
    }, 500);
  };

  const getStudents = useCallback(() => {
    http
      .get(`/students-by-class/${classId}/by-reward/${rewardId}`)
      .then((response) => {
        if (response?.data?.responseData?.length) {
          // FIXME: fix this eslint error
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setStudents(response?.data?.responseData);
          // FIXME: fix this eslint error
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setStudentList(response?.data?.responseData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [classId, rewardId]);

  const handleCheck = (value: number) => {
    return setSelected((prevState) => {
      const temp = [...prevState];
      if (temp.includes(value)) {
        const index = temp.indexOf(value);
        temp.splice(index, 1);
      } else {
        temp.push(value);
      }
      return temp;
    });
  };

  const handleAllSelect = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = target;
    const all: number[] = [];
    if (checked) {
      studentList.forEach((student) => {
        // FIXME: fix this ts and eslint errors
        // @ts-expect-error ts-error(2339)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (!defaultSelected.includes(student.id)) all.push(student.id);
      });
      return setSelected(all);
    }
    return setSelected([]);
  };

  const handleSave = async (rewardId: number, selectedStudents: number[]) => {
    try {
      const response = await studentsRedeemReward(rewardId, selectedStudents);
      Toaster('success', '¡Recompensas activadas exitosamente!');
      onClose();
      getStudents();
    } catch (error) {
      console.error(error);
      Toaster('error', 'Ha ocurrido un error');
    }
  };

  useEffect(() => {
    openDrawer && getStudents();
  }, [openDrawer, getStudents]);

  useEffect(() => {
    studentList.forEach((student) => {
      // FIXME: fix this ts error
      // @ts-expect-error ts-error(2339)
      if (student?.user_has_rewards?.length) {
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(2339)
        const currentReward = student.user_has_rewards.find(
          (reward: IUserHasReward) => rewardId === reward.id_reward
        );
        currentReward?.used_at &&
          setDefaultSelected((defaultSelected) => [
            ...defaultSelected,
            // FIXME: fix this ts error
            // @ts-expect-error ts-error(2339)
            student.id,
          ]);
      }
    });
  }, [studentList, rewardId]);

  return (
    <Drawer
      open={openDrawer}
      anchor='right'
      onClose={onClose}
      PaperProps={{ className: 'px-5 py-4' }}
    >
      <Typography
        component='h6'
        variant='h6'
        fontWeight='bold'
        className='mb-1'
      >
        Canjeo de recompensas
      </Typography>
      <Typography component='span' variant='body1'>
        Selecciona los estudiantes que van a canjear esta recompensa
      </Typography>
      <div className='d-flex justify-content-center my-3'>
        <StaticRewardCard
          order={order}
          icon={icon}
          title={title}
          description={description}
        />
      </div>
      <StudentListContainer
        id='reward-modal-list'
        className='d-flex flex-column overflow-hidden'
      >
        <TextField
          className='mb-3'
          variant='standard'
          placeholder='Buscar por nombre o apellido'
          fullWidth
          onChange={(event) => {
            if (!event.target.value) return setStudentList(students);
            setStudentList(
              studentList.filter((student) =>
                // FIXME: fix this ts error
                // @ts-expect-error ts-error(2339)
                `${student.first_name} ${student.last_name}`.includes(
                  event.target.value
                )
              )
            );
          }}
        />
        <div className='d-flex flex-column flex-fill gap-4 overflow-hidden'>
          <div className='d-flex w-100 align-items-center justify-content-between'>
            <FormControlLabel
              sx={{
                marginLeft: 0,
              }}
              label='Seleccionar a todos'
              className='mb-3'
              control={
                <Checkbox
                  onChange={handleAllSelect}
                  disabled={studentList.every((student) =>
                    // FIXME: fix this ts and eslint errors
                    // @ts-expect-error ts-error(2339)
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    defaultSelected.includes(student.id)
                  )}
                  checked={
                    !!studentList.length &&
                    studentList.every(
                      (student) =>
                        // FIXME: fix this ts and eslint errors
                        // @ts-expect-error ts-error(2339)
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        selected.includes(student.id) ||
                        // FIXME: fix this ts and eslint errors
                        // @ts-expect-error ts-error(2339)
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        defaultSelected.includes(student.id)
                    )
                  }
                />
              }
            />
            <div className='d-flex flex-column'>
              <div className='d-flex gap-2 justify-content-end'>
                <Button
                  id='reward-modal-cancel'
                  onClick={onClose}
                  variant='outlined'
                >
                  Cancelar
                </Button>
                <Button
                  id='reward-modal-save'
                  // FIXME: fix this eslint error
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={async () => await handleSave(rewardId, selected)}
                  variant='contained'
                  disabled={!Object.keys(selected).length}
                >
                  Guardar cambios
                </Button>
              </div>
              <Typography component='span' variant='body2' textAlign='end'>
                <b>
                  {Object.keys(selected).length +
                    Object.keys(defaultSelected).length}
                </b>{' '}
                de <b>{students.length}</b> estudiantes han canjeado esta
                recompensa
              </Typography>
            </div>
          </div>
          <div className='d-flex flex-column gap-3 overflow-auto'>
            {studentList.map((student, index) => (
              <div key={index} className='d-flex gap-2 align-items-center'>
                <Checkbox
                  // FIXME: fix this ts and eslint errors
                  // @ts-expect-error ts-error(2339)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  onChange={() => handleCheck(student.id)}
                  // FIXME: fix this ts and eslint errors
                  // @ts-expect-error ts-error(2339)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  disabled={defaultSelected.includes(student.id)}
                  checked={
                    // FIXME: fix this ts and eslint errors
                    // @ts-expect-error ts-error(2339)
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    selected.includes(student.id) ||
                    // FIXME: fix this ts and eslint errors
                    // @ts-expect-error ts-error(2339)
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    defaultSelected.includes(student.id)
                  }
                />
                <div className='d-flex align-items-center gap-3'>
                  <Avatar className='student-avatar'>{
                    // FIXME: fix this ts error
                    // @ts-expect-error ts-error(2339)
                    `${student.first_name[0]}${student.last_name[0]}`
                  }</Avatar>
                  <div className='d-flex flex-column'>
                    <Typography component='span' variant='body1'>{
                      // FIXME: fix this ts error
                      // @ts-expect-error ts-error(2339)
                      `${student.first_name} ${student.last_name}`
                    }</Typography>
                    <Typography
                      component='span'
                      variant='body2'
                      color='#969696'
                    >
                      {
                        // FIXME: fix this ts error
                        // @ts-expect-error ts-error(2339)
                        student.email
                      }
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </StudentListContainer>
    </Drawer>
  );
};

export default RedeemRewardDrawer;
