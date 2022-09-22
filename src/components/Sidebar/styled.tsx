import styled from 'styled-components';

const SidebarContainer = styled.div`
  background: #FFF;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 150px;
  z-index: 2;
`;

const LogoContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 24px;
  margin-bottom: 40%;
`;

const LinkList = styled.div`
  height: 100%;
`;

const SidebarLinkContainer = styled.div`
  height: 76px;
  &:not(:last-child) {
    margin-bottom: 36px;
  }
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
    color: gray;
    font-size: 16px;
  }

  // On hover
  &:hover {
    span {
      font-size: 17px;
    }
    img {
      width: 50px;
    }
  }

  // On active
  &.active {
    span {
      font-size: 17px;
      color: #5ea9c0;
    }
    img {
      background: transparent;
      border-radius: 100%;
      box-shadow: 0 0 4px 4px #68BCD5 inset, 0 0 16px 2px #68BCD5;
      width: 50px;
    }
  }
`;

export {
  SidebarContainer,
  LogoContainer,
  LinkList,
  SidebarLinkContainer,
};
