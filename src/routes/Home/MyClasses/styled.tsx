import { Accordion, Box } from '@mui/material';
import styled from 'styled-components';

export const LevelAccordion = styled(Accordion)`
  .MuiAccordionSummary-root {
    margin: 0;
    padding: 0;
    min-height: 0;
  }
  .MuiAccordionDetails-root {
    margin: 0;
    padding: 0;
  }
`;

export const MyClassesContainer = styled.div`
  padding: 36px 0px;
`;

export const MyClassesBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;

  .class-img-container {
    border: none;
    border-radius: 8px 8px 0px 0px;
    height: 160px;
    transition: all 0.3s ease;
    background-size: cover;
    background-position: center;
  }

  & a {
    color: #000;
    text-decoration: none;
    font-weight: normal;
  }

  & .class__level__cards__container {
    display: flex;
    &:last-child {
      margin-bottom: 24px;
    }

    & .class__level__card {
      border-radius: 8px;
      min-height: 194px;
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;
      transition: all 0.3s ease;
      box-shadow: 0 0 2px rgba(33, 33, 33, 0.6);
      border: 1px solid transparent;

      &:hover {
        color: ${(props) => props.theme.palette.primary.dark};
        border: 1px solid ${(props) => props.theme.palette.primary.dark};
      }
    }
  }
`;
