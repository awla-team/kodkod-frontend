import {
    DontHaveDetailsContent,
    StudentDetailBox,
    StudentListContainer,
    StudentListContent,
    StudentsListDetailsContainer
} from "./styled";
import {FC} from "react";
import {Avatar, Button, IconButton} from "@mui/material";
import {StudentsListProps} from "./interfaces";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StudentsList:FC<StudentsListProps>= ({studentsData}: StudentsListProps)=>{
    return <StudentListContainer>
        <h1 className={'header__text'}>
            Students list
        </h1>
        <StudentListContent hasDetails={!!studentsData.length}>
            {studentsData.length? <StudentsListDetails/>
                : <DontHaveDetails/>
            }

        </StudentListContent>
    </StudentListContainer>
}

export default StudentsList
const DontHaveDetails: FC= () =>{
    return <DontHaveDetailsContent>
        <span className={'helper__text'}>
Your class has no associated students yet
        </span>
        <Button variant={'contained'}>
            Add students
        </Button>
    </DontHaveDetailsContent>
}


const StudentsListDetails: FC= () =>{
    return <StudentsListDetailsContainer>
        <div className={'details'}>
            {
                [1,2,].map((res, index) =>{
                    return <StudentDetailBox key={index}>
                        <Avatar/>
                        <div className={'student__details'}>
                            <div className={'student__name'}>
                                Abc Efg
                            </div>
                            <div className={'student__email'}>
                                abc@gmail.com
                            </div>
                        </div>
                        <IconButton color={'inherit'}>
                            <MoreVertIcon/>
                        </IconButton>
                    </StudentDetailBox>
                })
            }
        </div>

        <Button variant={'contained'}>
            Add students
        </Button>
    </StudentsListDetailsContainer>
}