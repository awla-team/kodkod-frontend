import { ClassInterface } from "services/classes/interfaces";
import { Dispatch, SetStateAction, useState } from "react";

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
