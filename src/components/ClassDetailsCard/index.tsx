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

  const handleNavigate = (reason: "home" | "adventure") => {
    switch (reason) {
      case "adventure": {
        return navigate(`/app/cursos/${classDetails.id}/aventuras`);
      }
      case "home": {
        return navigate(`/app`, {
          state: {
            deletedClass: classDetails.id,
          },
        });
      }
      default: {
        return;
      }
    }
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e;
    setAnchorEl(currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteClass(classDetails.id);
      Toaster("success", `${classDetails.alias} deleted!`);
      handleNavigate("home");
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
          <MenuItem onClick={() => setOpenDeleteConfirmationDialog(true)}>
            Delete class
          </MenuItem>
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
        <Button
          variant="contained"
          size="large"
          onClick={() => handleNavigate("adventure")}
        >
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
      <ConfirmationModal
        open={openDeleteConfirmationDialog}
        callBackFunction={handleDelete}
        onClose={() => setOpenDeleteConfirmationDialog(false)}
        loading={loading}
        description={`Are you sure you want to delete ${classDetails.alias}?`}
      />
    </DetailsCardContent>
  );
};

export default ClassDetailsCard;
