import {DetailsCardContent} from "./styled";
import {ClassDetailsCardProps} from "./interfaces";
import {FC} from "react";
import {Button} from "@mui/material";


const ClassDetailsCard: FC<ClassDetailsCardProps>= ({classDetails})=>{
    return <DetailsCardContent>
        <div className={'card__title'}>
            <h1 className={'card__title__text'}>
                3 C
            </h1>
            <button className={'card__title__notification'}/>
        </div>
        <div className={'card__content'}>
            <p className={'adventure__status'}>
                You have an ongoing adventure!
            </p>
            <p className={'adventure__details'}>
               <b> With the reward in mind - Stage 2</b>
            </p>
        </div>
        <div className={'card__action'}>
            <Button variant={'contained'}>
                Continue adventure
            </Button>
        </div>
    </DetailsCardContent>
}

export default ClassDetailsCard