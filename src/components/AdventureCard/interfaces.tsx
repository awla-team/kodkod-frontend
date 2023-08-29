export interface IAdventureCardContainerProps {
  img?: string;
}

export interface IAdventureCardProps
  extends React.PropsWithChildren,
    IAdventureCardContainerProps {
  id?: string;
  title: string;
  completed: boolean;
  demo: boolean;
  stagesDuration?: number;
  info?: React.ReactNode;
  onClick?: () => void;
}
