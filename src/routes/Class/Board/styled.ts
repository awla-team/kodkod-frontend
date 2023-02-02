import styled from 'styled-components'
import {Box} from '@mui/material'

export const DashboardContainer =  styled(Box)`
display: grid;
  grid-template-columns: repeat(2, minmax(0, 50%));
  gap: 1rem;
  grid-gap: 1rem;
`


export const DetailsCard= styled(Box)`
border-radius: 8px;
  padding: 2.25rem;
  border: 1px solid #000;
`

export const DashboardContainerLeftSide= styled(Box)`

display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const DashboardContainerRightSide= styled(Box)``