import { AdventureBanner, DetailsCardContent } from "./styled";
import { ClassDetailsCardProps } from "./interfaces";
import React, { FC, useState } from "react";
import {
  Button,
  Chip,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import { CreateClassModal } from "../Modals";
import { useClassContext } from "routes/Class/context";
import { ClassInterface } from "../../services/classes/interfaces";
import ConfirmationModal from "../Modals/ConfirmationModal";
import Toaster from "../../utils/Toster";
import { deleteClass } from "../../services/classes";
import SkillPoints from "components/SkillPoints";

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
      window.location.reload();
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
          variant="h2"
          fontWeight="bold"
          className="mb-2"
        >
          {classDetails.alias}
        </Typography>
        <IconButton sx={{ position: 'absolute', top: '8px', right: 0 }} color="inherit" onClick={handleMenuOpen}>
          <MoreVertIcon fontSize="large" />
        </IconButton>

        
        <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleMenuClose}>
          <MenuItem onClick={() => setOpen(true)}>Editar información del curso</MenuItem>
          <MenuItem onClick={() => setOpenDeleteConfirmationDialog(true)}>
            Eliminar curso
          </MenuItem>
        </Menu>
      </Box>
      <div className="mb-3">
        {classDetails.current_adventure ? (
          <div>            
            <Typography component="span" variant="body1" className="mb-2">Tienes una aventura en curso:</Typography>
            <Typography variant="h5" fontWeight="bold" className="mb-2">{classDetails.current_adventure?.title}</Typography>
            <section className="d-flex flex-column">
              <div className="d-flex flex-wrap flex-lg-nowrap gap-3">
                {!!classDetails.current_adventure?.skills?.length ? classDetails.current_adventure.skills.map((adventureSkill, index) => (
                    <SkillPoints key={`${adventureSkill.id}-${adventureSkill.title}-${index}`} skill={adventureSkill} />
                )) : null}
              </div>
            </section>
            <div className="mt-3">
              <Button variant="contained" size="large" onClick={handleNavigate}>Continuar aventura</Button>
            </div>            
          </div>
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
        open={openDeleteConfirmationDialog}
        callBackFunction={handleDelete}
        onClose={() => setOpenDeleteConfirmationDialog(false)}
        loading={loading}
        description={<Typography>¿Estás seguro de que deseas eliminar el curso <b>{classDetails.alias}</b>?</Typography>}
      />
    </DetailsCardContent>
  );
};

export default ClassDetailsCard;
