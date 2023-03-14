import { ClassInterface } from "services/classes/interfaces";
import { Dispatch, SetStateAction, useState } from "react";
import { IStage } from "../global/interfaces";
import { generateAccessToken } from "../services/auth";

export const sortClasses = (classes?: ClassInterface[]): ClassInterface[] => {
  if (classes && Array.isArray(classes)) {
    return classes?.sort((a, b) => {
      if (a.alias < b.alias) {
        return -1;
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
  let finalQueryParamString = "";
  if (typeof obj === "object" && !Array.isArray(obj)) {
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
    case "easy": {
      return " level__easy";
    }
    case "normal": {
      return " level__normal";
    }
    case "hard": {
      return " level__hard";
    }
    default: {
      return " level__easy";
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

export const getAccessTokenUsingRefreshToken = () => {
  return new Promise(async (resolve, reject) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return reject("Refresh token not found");
    }
    try {
      const data = await generateAccessToken({ refreshToken });
      return resolve(data);
    } catch (e) {
      return reject(e);
    }
  });
};
