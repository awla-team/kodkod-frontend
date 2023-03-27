import styled from "styled-components";
import { IPoint } from "./interfaces";

const Point = styled.div`
  height: 10px;
  width: 10px;
  background-color: ${(props: IPoint) => (props.highlighted ? "#fff" : "#000")};
  border-radius: 24px;
  // border: 1px solid rgba(0, 0, 0, 0.4);
  opacity: ${(props: IPoint) => (props.highlighted ? "1" : "0.3")};
  &:not(:last-child) {
    margin-right: 4px;
  }
`;

export default Point;
