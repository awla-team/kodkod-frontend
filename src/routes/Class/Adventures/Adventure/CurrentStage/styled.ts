import styled from 'styled-components'
import {Box, StepConnector} from "@mui/material";
import {stepConnectorClasses} from '@mui/material/StepConnector'
import {stepperClasses} from '@mui/material/Stepper'
import {stepClasses} from '@mui/material/Step'
import {stepLabelClasses} from '@mui/material/StepLabel'


export const CurrentStageContainer= styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block: 1rem;
  
  & .action-container{
    display: flex;
    gap: 0.5rem;
    & a{
      text-decoration: none;
      font-size: 1.25rem;
      font-weight: 700;
      text-transform: capitalize;
      
      &:hover{
        color: #ffffff;
      }
    }
  }

  & .step-details {
    display: flex;
    flex-direction: column;
    
    & .stage-details{
      display: flex;
      gap: 1rem;
      align-items: center;
      padding-block: 1rem;
      font-size: 1.25rem;
      & .round-icon{
        background: #4A4A4A;
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
    }

    & .${stepperClasses.root} {
      margin-inline-start: 2.5rem;
      & .${stepClasses.root} {
        padding: 0;

        & .${stepLabelClasses.iconContainer} {
          padding: 0;
        }
      }
    }
  }

`


export const StyledStepConnector= styled(StepConnector)`
  max-width: 0.75rem;

  & .${stepConnectorClasses.line} {
    border-color: #000;
    width: 0.75rem;
  }
`

export const StepIconContainer= styled(Box)<{active:boolean; completed: boolean}>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #000;
  background: ${({active, completed}) => active ||completed ? "#4A4A4A" : "transparent"};
`