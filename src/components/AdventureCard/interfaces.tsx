export interface IAdventureCardContainerProps {  
    img?: string;
  };
  
export interface IAdventureCardProps extends React.PropsWithChildren, IAdventureCardContainerProps {
    title: string;
    stagesDuration: number;
    info?: React.ReactNode;
};