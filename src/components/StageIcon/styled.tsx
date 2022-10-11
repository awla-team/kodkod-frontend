import styled from 'styled-components';
import { IStageIconContainerProps } from './interfaces';

export const StageIconContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 36px;  
  border: ${(props: IStageIconContainerProps) => props.selected ? '2px solid #86D448' : '2px solid #4A4A4A'};
  background: ${(props: IStageIconContainerProps) => props.selected ? '#FFF' : '#4A4A4A'};  
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    filter: ${(props: IStageIconContainerProps) => props.selected ? 'invert(55%) sepia(100%) saturate(520%) hue-rotate(49deg) brightness(100%) contrast(95%)' : 'none'};
  }
`;