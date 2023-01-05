import styled from "styled-components";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
  height: 100%;
  min-width: 120px;
  /*padding: 24px 0px 0px 0px;*/
  z-index: 2;
  
`;

const LogoContainer = styled.div`
  width: 100%;
  height: auto;
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 16px 0px;
  overflow-y: auto;
`;

export { SidebarContainer, LogoContainer, LinkList };
