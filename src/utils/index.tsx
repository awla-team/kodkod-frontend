import { type IClass } from 'global/interfaces';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { type IStage } from '../global/interfaces';
import { generateAccessToken } from '../api/services/auth';
import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import CachedIcon from '@mui/icons-material/Cached';

export const difficultyIcons = {
  easy: <SignalCellularAlt1BarIcon fontSize='small' />,
  normal: <SignalCellularAlt2BarIcon fontSize='small' />,
  hard: <SignalCellularAltIcon fontSize='small' />,
};

export const sortClasses = (classes?: IClass[]): IClass[] => {
  if (classes && Array.isArray(classes)) {
    return classes?.sort((a, b) => {
      // FIXME: fix this ts error
      // @ts-expect-error ts-error(18048)
      if (a.alias < b.alias) {
        return -1;
        // FIXME: fix this ts error
        // @ts-expect-error ts-error(18048)
      } else if (a.alias > b.alias) {
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
