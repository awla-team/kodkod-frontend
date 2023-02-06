import styled from "styled-components";
import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";


export const ConfirmationModal= styled(Dialog)`
`

export const ConfirmationModalContent= styled(DialogContent)`
`

export const ConfirmationModalTitle= styled(DialogTitle)`
    font-weight: 700;
`

export const ActionButton= styled(Button)`
font-weight: 700;
  border-radius: 8px;
  text-transform: none;
  
  &.secondary__button{
    background: #C1C1C1;
    color: #000;
  }
`