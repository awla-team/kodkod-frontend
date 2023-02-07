import { FC } from "react";
import * as Styled from "./styled";
import { useFormik, useFormikContext } from "formik";
import { FormInitialValue } from "../interfaces";
import { ClassClimateMeterProps } from "./interfaces";

const thermometerData: { value: string; imgSrc: string }[] = [
  { imgSrc: "/image 10-disappointed.svg", value: "disappointed" },
  { imgSrc: "/image 9-sad.svg", value: "sad" },
  { imgSrc: "/image 8-neutral.svg", value: "neutral" },
  { imgSrc: "/image 7-happy.svg", value: "happy" },
  { imgSrc: "/image 6-joy.svg", value: "joy" },
];

export const ClassClimateMeter: FC<ClassClimateMeterProps> = ({ editable }) => {
  const { values, setFieldValue } = useFormikContext<FormInitialValue>();
  const handleImageClick = (value: string) => {
    setFieldValue("climate", value);
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
              src={img.imgSrc}
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
