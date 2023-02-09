import styled from "styled-components";
import { SectionSubtitleContainerProps } from "./interfaces";

export const SectionSubtitleContainer = styled.div`
  div {
    color: ${(props: SectionSubtitleContainerProps) =>
      props.textColor || "#000"};
    background-color: ${(props: SectionSubtitleContainerProps) =>
      props.filled ? props.lineColor || "#fff" : "transparent"};
    width: fit-content;
    font-weight: bold;
    margin: 0px;
    padding: ${(props) => (props.filled ? "4px 8px" : "0px")};
    font-size: 18px;
  }
  hr {
    margin: 4px 0px;
    border-top: 2px solid
      ${(props: SectionSubtitleContainerProps) => props.lineColor || "#fff"};
    opacity: 0.5;
  }
`;
