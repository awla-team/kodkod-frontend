export interface IAdventureCardContainerProps {  
    img?: string;
  };
  
export interface IAdventureCardProps extends React.PropsWithChildren, IAdventureCardContainerProps {
    title: string;
    weeksDuration: number;
    info?: React.ReactNode;
};