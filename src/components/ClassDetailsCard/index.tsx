import { AdventureBanner, DetailsCardContent } from "./styled";
import { ClassDetailsCardProps } from "./interfaces";
import React, { FC, useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { CreateClassModal } from "../Modals";
import { useClassContext } from "routes/Class/context";
import { ClassInterface } from "../../services/classes/interfaces";
import ConfirmationModal from "../Modals/ConfirmationModal";
import Toaster from "../../utils/Toster";
import { deleteClass } from "../../services/classes";
import SkillPoints from "components/SkillPoints";
import { IStage } from "global/interfaces";

const ClassDetailsCard: FC<ClassDetailsCardProps> = ({
  classDetails,
  levels,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] =
    useState<boolean>(false);
  const { setClassDetails } = useClassContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [latestStage, setLatestStage] = useState<IStage>(undefined);

  useEffect(() => {
    if (classDetails?.current_adventure?.stages?.length) {
      const filtered = classDetails.current_adventure.stages.filter((stage) => stage.active);  
      const newLatestStage = [...filtered].sort((a, b) => {
        if (a._index > b._index) return 1;
        if (a._index < b._index) return -1;
        return 0;
      });
      setLatestStage(newLatestStage[newLatestStage.length - 1]);
    }
  }, [classDetails]);

  const handleClose = (
    reason: "backdropClick" | "escapeKeyDown" | "success",
    data?: ClassInterface
  ) => {
    if ("success") {
      setClassDetails((prevState) => {
        return { ...prevState, ...data };
      });
      setOpen(false);
      setAnchorEl(null);
    }
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e;
    setAnchorEl(currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {    
    navigate(`/app/cursos/${classDetails.id}/aventuras`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteClass(classDetails.id);
      Toaster("success", `${classDetails.alias} deleted!`);
      navigate('/app');
      //window.location.reload();
    } catch (e: any) {
      Toaster("error", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DetailsCardContent>   
      <Box
        display={"flex"}
        sx={{ position: 'relative' }}
        alignItems={"start"}
        justifyContent={"space-between"}
      >
        
        <Typography
          component="h2"
          title={classDetails.alias}
          variant="h2"
          fontWeight="bold"
          className="mb-2"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {classDetails.alias}
        </Typography>
        <IconButton sx={{ top: '8px', right: 0, marginLeft: '16px' }} color="inherit" onClick={handleMenuOpen}>
          <MoreVertIcon fontSize="large" />
        </IconButton>

        
        <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleMenuClose}>
          <MenuItem onClick={() => setOpen(true)}>Editar información del curso</MenuItem>
          <MenuItem onClick={() => setOpenDeleteConfirmationDialog(true)}>
            Eliminar curso
          </MenuItem>
        </Menu>
      </Box>
      <div>
        {classDetails.current_adventure ? (
          <Box className="p-4" sx={{ backgroundImage: `url(${latestStage?.icon})`, borderRadius: '8px', color: '#FFF', boxShadow: 'rgb(0, 0, 0) 0px 0px 200px 40px inset', backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <section className="d-flex flex-column mb-1">
              <div className="d-flex flex-wrap flex-lg-nowrap gap-2">
                {!!classDetails.current_adventure?.skills?.length ? classDetails.current_adventure.skills.map((adventureSkill, index) => (
                    <SkillPoints key={`${adventureSkill.id}-${adventureSkill.title}-${index}`} skill={adventureSkill} />
                )) : null}
              </div>
            </section>
            <Typography variant="h6" fontWeight="bold">{`${classDetails.current_adventure?.title}`}</Typography>
            <Typography variant="body1" className="mb-3">{`Etapa ${latestStage?._index}: ${latestStage?.title}`}</Typography>
            <div className="mt-2">
              <Button variant="contained" onClick={handleNavigate}>Continuar aventura</Button>
            </div>            
          </Box>
        ) : (
          <div className="d-flex flex-column">
            <Typography component="span" variant="body1" fontWeight="bold" mb={1}>¡Aún no has seleccionado una aventura!</Typography>
            <Typography component="span" variant="body1">Presiona el botón a continuación para escoger una aventura que se ajuste a tus objetivos</Typography>
            <div className="mt-4">
              <Button variant="contained" size="large" onClick={handleNavigate}>Selecciona una aventura</Button>
            </div>
          </div>          
        )}
      </div>
      <CreateClassModal
        classDetails={classDetails}
        open={open}
        onClose={handleClose}
        levels={levels}
      />
      <ConfirmationModal
        title={`¿Estás seguro de eliminar el curso ${classDetails.alias}? `}
        open={openDeleteConfirmationDialog}
        callBackFunction={handleDelete}
        onClose={() => setOpenDeleteConfirmationDialog(false)}
        loading={loading}
        description={<Typography>El curso será eliminado y el avance de la aventura se perderá.</Typography>}
      />
    </DetailsCardContent>
  );
};

export default ClassDetailsCard;
