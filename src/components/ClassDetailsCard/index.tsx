import { DetailsCardContent } from "./styled";
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
import { useNavigate } from "react-router-dom";
import { CreateClassModal } from "../Modals";
import { useClassContext } from "routes/Class/Context";
import { ClassInterface } from "../../services/classes/interfaces";

const ClassDetailsCard: FC<ClassDetailsCardProps> = ({
  classDetails,
  levels,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState<boolean>(false);
  const { setClassDetails } = useClassContext();

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

  const handleNavigate = () => {
    //navigate(`/app`);
    navigate(`/app/cursos/${classDetails.id}/aventuras`);
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e;
    setAnchorEl(currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <DetailsCardContent>
      <Box
        display={"flex"}
        alignItems={"center"}
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

        <IconButton color={"inherit"} onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleMenuClose}>
          <MenuItem onClick={() => setOpen(true)}>Edit class</MenuItem>
          <MenuItem>Delete class</MenuItem>
        </Menu>
      </Box>
      <div className="mb-3">
        {classDetails.current_adventure ? (
          <div className="d-flex flex-column">
            <div className="mb-2">
              <Chip
                label="Aventura en curso"
                color="primary"
                variant="outlined"
              />
            </div>
            <Typography component="span" variant="body1">
              {classDetails.current_adventure.title}
            </Typography>
          </div>
        ) : (
          <div className="d-flex flex-column">
            <Typography
              component="span"
              variant="body1"
              fontWeight="bold"
              mb={1}
            >
              ¡Aún no has seleccionado una aventura!
            </Typography>
            <Typography component="span" variant="body1">
              Presiona el botón a continuación para escoger una aventura que se
              ajuste a tus objetivos
            </Typography>
          </div>
        )}
      </div>
      <div>
        <Button variant="contained" size="large" onClick={handleNavigate}>
          {classDetails.current_adventure
            ? "Continua la aventura"
            : "Selecciona una aventura"}
        </Button>
      </div>
      <CreateClassModal
        classDetails={classDetails}
        open={open}
        onClose={handleClose}
        levels={levels}
      />
    </DetailsCardContent>
  );
};

export default ClassDetailsCard;
