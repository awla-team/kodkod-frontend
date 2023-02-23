import styled from "styled-components";


const SidebarContainer = styled.div`
  position: relative;
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

  .home-button {
    margin-bottom: 16px;
  }  
`;

const LogoContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 0px 12px;

  img {
    width: 100%;
    height: auto;    
  }
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 1px 0px;
  margin-bottom: 16px;
  overflow-y: overlay;
  transition: all 0.3s ease;

  &::-webkit-scrollbar {    
    width: 0;
    transition: all 0.3s ease;
  }

  &:hover::-webkit-scrollbar {    
    width: 3px;
  }
`;

export { SidebarContainer, LogoContainer, LinkList };
