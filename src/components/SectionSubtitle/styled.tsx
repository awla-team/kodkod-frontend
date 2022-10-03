import styled from 'styled-components';
import { SectionSubtitleContainerProps } from './interfaces';


export const SectionSubtitleContainer = styled.div`
  div {
    color: ${(props: SectionSubtitleContainerProps) => (props.textColor || '#000')};
    background-color: ${(props: SectionSubtitleContainerProps) => (props.backgroundColor || '#fff')};
    width: fit-content;
    font-weight: bold;
    margin: 0px;
    padding: 4px 8px;
    font-size: 18px;
  }  
  hr {
    margin: 4px 0px;
    border-top: 2px solid ${(props: SectionSubtitleContainerProps) => (props.backgroundColor || '#fff')};
    opacity: 0.5;
  }
`;