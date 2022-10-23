import styled from "styled-components";

export const SidebarLinkContainer = styled.div`
  height: 76px;

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
    color: white;
    font-size: 14px;
  }

  a > div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #5ea9c0;
    border-radius: 100%;
    width: 68px;
    height: 68px;
    padding: 8px;
    transition: all 0.3s ease;
  }

  // On hover
  &:hover {
    a > div {
      filter: brightness(80%);
    }
    img {
      width: 50px;
    }
  }

  // On active
  &.active {
    a > div {
      background-color: white;
      box-shadow: 0 0 16px 4px #68bcd5, 0 0 16px 2px #68bcd5;
    }
    span {
      font-size: 16px;
      color: #68bcd5;
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
