import React from "react";
import { Box, Typography } from "@mui/material";

const StageSummary: React.FC<{
  title: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
}> = ({ icon, title, description, color }) => {
  return (
    <div className="d-flex align-items-center gap-3 w-100">
      <Box
        sx={{
          width: "32px",
          minWidth: "32px",
          height: "32px",
          minHeight: "32px",
          bgcolor: color || "grey",
          borderRadius: "100%",
        }}
      >
        {icon}
      </Box>
      <div className="d-flex flex-column justify-content-center">
        <Typography variant="body1" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </div>
    </div>
  );
};

export default StageSummary;
