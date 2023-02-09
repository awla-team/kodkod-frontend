import React from "react";
import { Box, Typography } from "@mui/material";
import Point from "components/Point";

const SkillSummary: React.FC<{
  title: string;
  points: number;
  icon?: string;
  color?: string;
}> = ({ title, points, icon, color }) => (
  <div className="d-flex align-items-center gap-2">
    <Box
      sx={{
        minWidth: "28px",
        minHeight: "28px",
        bgcolor: color || "grey",
        borderRadius: "100%",
        overflow: "hidden",
      }}
    >
      {icon ? <img className="w-100 h-100" src={icon} /> : null}
    </Box>
    <div className="d-flex flex-column justify-content-center gap-1">
      <Typography variant="caption" lineHeight={1} sx={{ wordBreak: "normal" }}>
        {title}
      </Typography>
      <div className="d-flex">
        <Point
          highlighted={points > 0}
          style={{
            width: 8,
            height: 8,
            backgroundColor: points > 0 ? color || "grey" : null,
          }}
        />
        <Point
          highlighted={points > 1}
          style={{
            width: 8,
            height: 8,
            backgroundColor: points > 1 ? color || "grey" : null,
          }}
        />
        <Point
          highlighted={points > 2}
          style={{
            width: 8,
            height: 8,
            backgroundColor: points > 2 ? color || "grey" : null,
          }}
        />
      </div>
    </div>
  </div>
);

export default SkillSummary;
