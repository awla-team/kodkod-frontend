import styled from "styled-components";
import Drawer,  { drawerClasses } from "@mui/material/Drawer";

export const MissionAccomplishedDrawer = styled(Drawer)`


  & .${drawerClasses.paper} {
    width: 409px;
    padding: 0 1rem;
    height: 100vh;
  }

  & .drawer__header {
    z-index: 1;
    position: sticky;
    top: 0;
    background: #fff;
    text-align: right;
  }

  & .drawer__heading__text {
    font-size: 1.5rem;
    font-weight: 700;
    margin-block: 0.5rem;
  }

  & .card__container {
    margin-block: 0.5rem;
  }

  & .info__text {
    margin-block: 0.5rem;
  }

  & .info__text__block {
    padding: 0.5rem;
    margin-block: 0.5rem;
    border: 1px solid black;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: 8px;

    & > img {
      width: 43px;
      height: 43px;
    }

    & > .info__text {
      font-size: 0.75rem;
      margin: 0;
    }
  }


  & .student__details__section {
    margin-block: 0.5rem;
    height: 46%;
    min-height: 400px;
  }

  & .student__list__actions {
    position: sticky;
    bottom: 0;
    z-index: 1;
    background: #fff;
    padding: 1rem;
  }
`;
