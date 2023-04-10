import styled from "styled-components";
import {
  Box,
  Table,
  TableContainer,
  tableHeadClasses,
  tableCellClasses,
  tableBodyClasses,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const ProgressContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background: #FFF;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

export const StickyDataGrid = styled(DataGrid)`
  & .MuiDataGrid-columnHeaders {
    position: sticky;
    z-index: 1;
    top: 0;
    border-radius: 0;
    background: ${(props) => props.theme.palette.primary.dark};

    .MuiDataGrid-columnHeaderTitle {
      font-weight: bold;
      color: ${(props) => props.theme.palette.primary.contrastText};
    }
  }
  & .MuiDataGrid-footerContainer {
    position: sticky;
    z-index: 1;
    bottom: 0;
    background: #fff;
    margin-bottom: 0;
    border: 0;
    outline: 1px solid rgb(224, 224, 224);
    display: flex;
    p {
      margin: 0;
    }
  }
  & .MuiDataGrid-main {
    overflow: visible;
  }

  .MuiDataGrid-row:nth-child(even) {
    background: #fafafa;
  }

  .MuiDataGrid-row:hover {
    background: #e0edff;
  }
`;
