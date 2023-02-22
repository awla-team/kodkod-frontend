import styled from "styled-components";


const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  height: 100%;
  width: 88px;
  z-index: 2;
  font-size: 14px;
  padding: 24px 0px;
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
