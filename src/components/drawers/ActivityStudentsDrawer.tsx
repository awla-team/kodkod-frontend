import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import type IActivity from 'types/models/Activity';
import { useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { useClassroom } from 'zustand/classroom-store';
import studentActivity from 'services/student_activity';
import { type CreateStudentActivity } from 'types/validations/student-activity';
import Toaster from 'utils/Toster';
import type { StudentCompleteActivity } from 'types/models/StudentActivity';
import type ILesson from 'types/models/Lesson';

interface Props {
  activity: IActivity;
  lesson?: ILesson;
  closeDrawer: () => void;
  reloadActivities: () => void;
}

const ActivityStudentsDrawer: React.FC<Props> = ({
  activity,
  closeDrawer,
  reloadActivities,
  lesson,
}) => {
  const [registers, setRegisters] = useState<StudentCompleteActivity[]>([]);
  const [filteredRegisters, setFilteredRegisters] = useState<
    StudentCompleteActivity[]
  >([]);
  const [searchStudentInput, setSearchStudentInput] = useState<string>('');
  const [selectAllStudents, setSelectAllStudents] = useState<boolean>(false);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const { classroom } = useClassroom();

  const { mutate: getStudentsByClassroom, isPending } = useMutation({
    mutationFn: async () =>
      await studentActivity.getStudentsCompletedActivity(activity.id, {
        classroom_id: classroom ? classroom.id : 0,
      }),
    onSuccess: (response) => {
      if (response) {
        setRegisters(response.data);
        setFilteredRegisters(response.data);
        const selected = response.data.filter((register) => register.completed);
        const selectedIds = selected.map((register) => register.student.id);
        setSelectedStudents(selectedIds);
      }
    },
  });

  useEffect(() => {
    getStudentsByClassroom();
  }, [activity, getStudentsByClassroom]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchStudentInput(value);

    const filter = registers.filter((register) => {
      return (
        register.student.first_name
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        register.student.last_name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredRegisters(
      filter.length === 0 || value === '' ? registers : filter
    );
  };

  const handleSelectAllStudents = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAllStudents(isChecked);

    if (isChecked) {
      const studentsIds = filteredRegisters.map(
        (register) => register.student.id
      );
      setSelectedStudents(studentsIds);
    } else {
      setSelectedStudents([]);
    }
  };

  const handleStudentSelected = (studentId: number) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const saveActivityStudents = async () => {
    try {
      const removeRegisterData: CreateStudentActivity[] = registers.map(
        (register) => ({
          student_id: register.student.id,
          activity_id: activity.id,
          isNew: selectedStudents.includes(register.student.id),
        })
      );

      const { status } =
        await studentActivity.createWithList(removeRegisterData);
      if (status === 201) {
        Toaster('success', 'Los estudiantes han finalizado la actividad');
        reloadActivities();
        closeDrawer();
      }
    } catch (e) {
      Toaster('error', 'Hubo un error al guardar la actividad');
    }
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <div className='tw-w-[400px] tw-h-full tw-flex tw-flex-col tw-gap-4 tw-pb-4'>
      <div className='tw-w-full tw-bg-gradient-to-r tw-from-blue-600 tw-to-cyan-500 p-4 tw-flex'>
        <p className='tw-text-white tw-mb-0 tw-font-semibold'>
          {activity.title}
        </p>
      </div>
      <div className='tw-grow tw-px-6 tw-space-y-2'>
        <div className='tw-flex tw-items-center '>
          <AccessibilityNewIcon fontSize='small' />
          <h3 className='tw-font-semibold tw-text-xl tw-mb-0'>
            ¡Actividad Cumplida!
          </h3>
        </div>
        {lesson?.ended_at ? (
          <p>Estos son los estudiantes que han completado la actividad</p>
        ) : (
          <p>Selecciona los estudiantes que han completado la actividad</p>
        )}

        {registers.length > 0 ? (
          <>
            <form className='tw-border tw-border-zinc-400 tw-rounded-lg tw-flex tw-items-center tw-bg-zinc-100 tw-py-1.5 tw-px-2 tw-gap-2'>
              <Search />
              <input
                type='text'
                placeholder='Buscar estudiante'
                className='focus:tw-outline-none tw-bg-zinc-100 tw-border-none tw-text-black tw-w-full'
                value={searchStudentInput}
                onChange={onChange}
              />
            </form>

            <div>
              {!lesson?.ended_at && (
                <div className='tw-flex tw-items-center tw-justify-between'>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectAllStudents}
                          onChange={handleSelectAllStudents}
                        />
                      }
                      label='Seleccionar a todos'
                    />
                  </FormGroup>
                  <span className='tw-text-xs'>
                    {selectedStudents.length}/{registers.length}
                  </span>
                </div>
              )}
              <FormGroup className='tw-space-y-2'>
                {filteredRegisters.map((register, index) =>
                  !lesson?.ended_at ? (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={selectedStudents.includes(
                            register.student.id
                          )}
                          onChange={() =>
                            handleStudentSelected(register.student.id)
                          }
                        />
                      }
                      label={
                        <div className='tw-flex tw-items-center tw-gap-2'>
                          <Avatar className='tw-bg-primary-500 tw-text-sm'>
                            {register.student.first_name[0]}
                            {register.student.last_name[0]}
                          </Avatar>
                          <p className='tw-m-0'>
                            {register.student.first_name}{' '}
                            {register.student.last_name}
                          </p>
                        </div>
                      }
                    />
                  ) : (
                    <div
                      key={index}
                      className='tw-flex tw-items-center tw-gap-2'
                    >
                      <Avatar className='tw-bg-primary-500 tw-text-sm'>
                        {register.student.first_name[0]}
                        {register.student.last_name[0]}
                      </Avatar>
                      <p className='tw-m-0'>
                        {register.student.first_name}{' '}
                        {register.student.last_name}
                      </p>
                    </div>
                  )
                )}
              </FormGroup>
            </div>
          </>
        ) : (
          <p>No hay estudiantes registrados</p>
        )}
      </div>

      <div className='tw-px-6 tw-flex tw-items-center tw-gap-2'>
        <Button className='tw-w-full' variant='outlined' onClick={closeDrawer}>
          Cancelar
        </Button>
        {!lesson?.ended_at && (
          <Button
            className='tw-w-full'
            variant='contained'
            onClick={saveActivityStudents}
          >
            Guardar
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActivityStudentsDrawer;
