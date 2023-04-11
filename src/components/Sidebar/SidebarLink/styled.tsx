import styled from "styled-components";

export const SidebarLinkContainer = styled.div`
  a {
    text-decoration: none;
  }

  span {
    transition: all 0.2s ease;
    font-weight: bold;
    font-size: 14px;
  }

  a > div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.palette.primary.contrastText};
    color: ${(props) => props.theme.palette.primary.main};
    box-shadow: 0 0 2px rgba(33, 33, 33, 0.6);
    border-radius: 100%;
    width: 40px;
    height: 40px;
    padding: 2px;
    transition: all 0.3s ease;
    border: 1px solid transparent;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  // On hover
  &:hover {
    a > div {
      border: 1px solid ${(props) => props.theme.palette.primary.dark};
      &.active {
        transition: none;
      }
    }
  }

  // On active
  &.active {
    a > div {
      background-color: ${(props) => props.theme.palette.highlight.main};
      box-shadow: none;
      border: none;
    }
    span {
      color: #ffffff;
    }
  }
`;
