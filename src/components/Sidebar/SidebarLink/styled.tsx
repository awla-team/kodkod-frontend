import styled from "styled-components";

export const SidebarLinkContainer = styled.div`
  a {
    text-decoration: none;
  }
  img {
    transition: all 0.2s ease;
    width: 46px;
    margin-bottom: 4px;
  }
  span {
    transition: all 0.2s ease;
    font-weight: bold;
    color: #bdbdbd;
    font-size: 14px;
  }

  a > div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 100%;
    width: 58px;
    height: 58px;
    padding: 8px;
    transition: all 0.3s ease;
    border: 2px solid #bdbdbd;
  }

  // On hover
  &:hover {
    a > div {
      filter: brightness(92%);
    }
    img {
      width: 50px;
    }
  }

  // On active
  &.active {
    a > div {
      background-color: ${(props) => props.theme.palette.primary.light};
      border: 2px solid ${(props) => props.theme.palette.primary.main};
    }
    span {
      font-size: 16px;
      color: ${(props) => props.theme.palette.primary.main};
    }
    img {
      background: transparent;
      border-radius: 100%;
      /*box-shadow: 0 0 4px 4px #68bcd5 inset, 0 0 16px 2px #68bcd5;*/
      width: 50px;
    }
    &:hover {
      a > div {
        filter: none;
      }
    }
  }
`;
