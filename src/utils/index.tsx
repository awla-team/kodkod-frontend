import { type ITeacherSubjectClassroom } from 'global/interfaces';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { type IStage } from '../global/interfaces';
import { generateAccessToken } from '../services/auth';
import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import CachedIcon from '@mui/icons-material/Cached';
import { type StudentType } from 'components/StudentsList/interfaces';

export const difficultyIcons = {
  easy: <SignalCellularAlt1BarIcon fontSize='small' />,
  normal: <SignalCellularAlt2BarIcon fontSize='small' />,
  hard: <SignalCellularAltIcon fontSize='small' />,
};

export const sortClassrooms = (
  classrooms?: ITeacherSubjectClassroom[]
): ITeacherSubjectClassroom[] => {
  if (classrooms && Array.isArray(classrooms)) {
    return classrooms?.sort((a, b) => {
      if (a.classroom.title < b.classroom.title) {
        return -1;
      } else if (a.classroom.title > b.classroom.title) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  return [];
};

export const generateQueryParamsFromObject = (obj: any): string => {
  let finalQueryParamString = '';
  if (typeof obj === 'object' && !Array.isArray(obj)) {
    // FIXME: fix this eslint error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Object.keys(obj).forEach((key, index) => {
      if (index === 0) {
        finalQueryParamString += `?${key}=${obj[key]}`;
      } else {
        finalQueryParamString += `&${key}=${obj[key]}`;
      }
    });
  }
  return finalQueryParamString;
};

export const putDifficultyClass = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy': {
      return ' level__easy';
    }
    case 'normal': {
      return ' level__normal';
    }
    case 'hard': {
      return ' level__hard';
    }
    default: {
      return ' level__easy';
    }
  }
};

export const difficultyToText = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy': {
      return ' Fácil';
    }
    case 'normal': {
      return ' Normal';
    }
    case 'hard': {
      return ' Difícil';
    }
    default: {
      return ' Fácil';
    }
  }
};

export const sortStageByActiveStatus = (stages: IStage[]) => {
  return stages
    .sort((stage1, stage2) => {
      return stage1._index - stage2._index;
    })
    .sort((stage1, stage2) => {
      return Number(stage2.active) - Number(stage1.active);
    });
};

export const getActiveStage = (
  stage: IStage[],
  sort?: boolean
): IStage | null => {
  if (stage.length) {
    let actives = stage.filter((res) => res.active);
    if (sort) {
      actives = sortStageByActiveStatus(actives);
    }
    return actives[actives.length - 1];
  } else {
    return null;
  }
};

export const getFirstNonActiveStage = (
  stage: IStage[],
  sort?: boolean
): IStage | null => {
  if (stage.length) {
    let actives = stage.filter((res) => !res.active);
    if (sort) {
      actives = sortStageByActiveStatus(actives);
    }
    return actives[0];
  } else {
    return null;
  }
};

export const getAccessTokenUsingRefreshToken = async () => {
  // FIXME: fix this eslint errors
  // eslint-disable-next-line no-async-promise-executor
  return await new Promise(async (resolve, reject) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      // FIXME: fix this eslint error
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject('Refresh token not found');
    }
    try {
      const data = await generateAccessToken({ refreshToken });
      return resolve(data);
    } catch (e) {
      return reject(e);
    }
  });
};

export const isStudentValid = (
  students: Array<{ first_name: string; last_name: string; email: string }>,
  index: number,
  existingStudents: StudentType[]
) => {
  const currentStudent = students[index];
  return (
    students.some(
      (student, i) =>
        i !== index &&
        student.first_name === currentStudent.first_name &&
        student.last_name === currentStudent.last_name &&
        student.email === currentStudent.email
    ) ||
    students.some(
      (student, i) =>
        i !== index &&
        student.first_name.trim() === '' &&
        student.last_name.trim() === '' &&
        student.email.trim() === ''
    ) ||
    existingStudents.some(
      (student, i) =>
        i !== index &&
        student.first_name === currentStudent.first_name &&
        student.last_name === currentStudent.last_name &&
        student.email === currentStudent.email
    ) ||
    students.some((student) => !isValidEmail(student.email))
  );
};

/**
 * Valida si el string proporcionado tiene formato de correo electrónico.
 * @param {string} email El correo electrónico a validar.
 * @returns {boolean} `true` si el formato es válido, `false` en caso contrario.
 */
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
