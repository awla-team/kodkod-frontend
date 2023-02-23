import styled from "styled-components";
import {  
  FormLabel,  
} from "@mui/material";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DialogFormLabel = styled(FormLabel)`
  font-weight: 700;
  font-size: 1rem;
  color: inherit;

  & .helper__text {
    font-size: 0.75rem;
    font-style: italic;
    font-weight: 700;
  }
`;
