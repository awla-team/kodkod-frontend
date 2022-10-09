import { IAdventure } from "../../../global/interfaces";

export interface IAdventureBannerProps {
    backgroundImg: string;
};

export interface IAdventureProviderProps extends React.PropsWithChildren {
    adventureId: string | undefined;
}

export interface IAdventureContext {
    adventure: IAdventure | undefined;
}