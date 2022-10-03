import styled, { ThemeProps, DefaultTheme } from 'styled-components';

const ViewContainer = styled.div`
  padding-top: 48px;

  h2 {
    font-weight: bold;
    color: ${(props: ThemeProps<DefaultTheme>) => props.theme.palette.primary.dark};
  }
`;

export default ViewContainer;