import styled from 'styled-components'
import {Box} from "@mui/material";
import {buttonClasses} from '@mui/material/Button'
export const StudentListContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
    & .header__text{
      font-size: 1.25rem;
      font-weight: 700;
    }
  
`


export const StudentListContent = styled(Box).withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) => !['hasDetails'].includes(prop) && defaultValidatorFn(prop)
})<{hasDetails?: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: ${({hasDetails}) => !hasDetails? 'center': 'flex-start'};
  align-items: ${({hasDetails}) => !hasDetails? 'center': 'flex-start'};
  height: 100%;
`

export const DontHaveDetailsContent= styled(Box)`
    display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
  & .helper__text{
    color:#4E4E4E;
    font-size: 1.125rem;
    text-align: center;
  }
  
  & button{
    border-radius: 8px;
    text-transform: none;
  }
`

export const StudentsListDetailsContainer= styled(Box)`
  margin-block-start: 1rem;
display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  height: 100%;
  & .details{
    flex-grow: 1;
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }
  
  & .${buttonClasses.contained}{
    border-radius: 8px;
    text-transform: none;
    font-weight: 700;
  }
  
`

export const StudentDetailBox= styled(Box)`
display: flex;
  align-items: center;
  gap: 1rem;
  & .student__details{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    
    & .student__email{
      color: #969696
    }
  }
`