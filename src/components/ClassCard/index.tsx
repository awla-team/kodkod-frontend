import { Typography, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { ClassCardProps } from './interfaces';

const ClassCard: React.FC<ClassCardProps> = ({ classObj }) => {    
  return (
    <Link                      
        to={`cursos/${classObj.id}/tablero`}
    >
        <div className={"class__level__card"}>
            <div className="d-flex justify-content-end p-2 class-img-container">
                <Chip label="Sin aventura en curso" color="info" />
            </div>
            <div className="p-4">
                <Typography component="h4" variant="h4" fontWeight="bold" className="mb-2">{classObj.alias}</Typography>
                <Typography component="span" variant="body1">Sin aventura en curso</Typography>                          
            </div>                        
        </div>
    </Link>
  );
};

export default ClassCard;