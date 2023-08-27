import { Button, Card, TextareaAutosize } from '@mui/material';
import styled, { DefaultTheme } from 'styled-components';

export interface IRewardCardElementProps {
  type: string;
}

export const RewardCardContainer = styled(Card)`
  position: relative;
  overflow: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 432px;
  border-radius: 8px;
  border: 2px solid transparent;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    border: 2px solid
      ${({ theme }: { theme: DefaultTheme }) => theme.palette.highlight.dark};
  }

  &.static {
    cursor: auto;
    border: 2px solid
      ${({ theme }: { theme: DefaultTheme }) => theme.palette.highlight.dark};
  }
`;

export const RewardCardHeader = styled.header`
  display: flex;
  width: 100%;
  height: 48px;
  padding: 0px 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0px 0px;
  background: #910094;
`;

export const RewardCardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 220px;
  flex: 1 1 auto;
  padding: 24px 24px 36px 24px;
  gap: 24px;
  border-radius: 0px 0px 8px 8px;
  background: #fff;
`;

export const EditRewardButton = styled(Button)`
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px solid #fff;
  background: #fff;

  &:hover {
    border: 1px solid
      ${({ theme }: { theme: DefaultTheme }) => theme.palette.highlight.dark};
  }
`;

export const RewardDescriptionInput = styled(TextareaAutosize)`
  border: 1px solid rgba(0, 0, 0, 0.22);
  border-radius: 4px;
  height: 100%;
  width: 100%;
  padding: 4px;
  color: black;
  background-color: transparent;

  &:focus {
    border: 2px solid
      ${({ theme }: { theme: DefaultTheme }) => theme.palette.primary.main};
    outline: none;

    &:hover {
      border: 2px solid
        ${({ theme }: { theme: DefaultTheme }) => theme.palette.primary.main};
    }
  }

  &:hover {
    border: 1px solid black;
  }
`;

export const RewardImg = styled.img`
  max-height: 144px;
`;

export const EditRewardActionsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  top: -56px;
  right: 50%;
  transform: translateX(50%);
  gap: 8px;
`;
