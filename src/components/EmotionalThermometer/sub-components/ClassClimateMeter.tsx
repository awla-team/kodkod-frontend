import { FC } from "react";
import * as Styled from "./styled";
import { useFormik, useFormikContext } from "formik";
import { FormInitialValue } from "../interfaces";
import { ClassClimateMeterProps } from "./interfaces";

const thermometerData: {
  value: number;
  imgSrc: string;
  selectedImgSrc?: string;
}[] = [
  {
    imgSrc: "/angry-outlined.svg",
    value: 1,
    selectedImgSrc: "/angry-filled.svg",
  },
  {
    imgSrc: "/sad-outlined.svg",
    value: 2,
    selectedImgSrc: "/sad-filled.svg",
  },
  {
    imgSrc: "/neutral-outlined.svg",
    value: 3,
    selectedImgSrc: "/neutral-filled.svg",
  },
  {
    imgSrc: "/smile-outlined.svg",
    value: 4,
    selectedImgSrc: "/smile-filled.svg",
  },
  {
    imgSrc: "/grinning-outlined.svg",
    value: 5,
    selectedImgSrc: "/grinning-filled.svg",
  },
];

export const ClassClimateMeter: FC<ClassClimateMeterProps> = ({ editable }) => {
  const { values, setFieldValue } = useFormikContext<FormInitialValue>();
  const handleImageClick = (value: number) => {
    setFieldValue("score", value);
  };
  return (
    <Styled.ClimateThermometerContainer>
      <div className={"header__text"}>
        How was the climate in the classroom today?
      </div>
      <div className={"thermometer__container"}>
        {thermometerData.map((img, index) => {
          return (
            <img
              src={values.score === img.value ? img.selectedImgSrc : img.imgSrc}
              alt={"img"}
              key={index}
              className={"meter"}
              onClick={() => !editable && handleImageClick(img.value)}
            />
          );
        })}
      </div>
    </Styled.ClimateThermometerContainer>
  );
};
