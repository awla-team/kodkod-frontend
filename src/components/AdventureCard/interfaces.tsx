export interface IAdventureCardContainerProps {
  img?: string;
}

export interface IAdventureCardProps
  extends React.PropsWithChildren,
    IAdventureCardContainerProps {
  title: string;
  completed: boolean;
  demo: boolean;
  stagesDuration?: number;
  info?: React.ReactNode;
  onClick?: () => void;
}
