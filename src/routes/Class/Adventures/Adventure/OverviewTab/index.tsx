import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { AdventureContext } from "../../Adventure/provider";
import SectionSubtitle from "components/SectionSubtitle";
import theme from "global/theme";

const OverviewTab: React.FC = () => {
  const { adventure } = useContext(AdventureContext);

  return (
    <div>
      <div className="mb-4">
        <SectionSubtitle
          lineColor={theme.palette.primary.dark}
          textColor={theme.palette.primary.dark}
        >
          Resumen de la aventura
        </SectionSubtitle>
        <Typography>{adventure?.overview}</Typography>
      </div>
      <div className="mb-4">
        <SectionSubtitle
          lineColor={theme.palette.primary.dark}
          textColor={theme.palette.primary.dark}
        >
          Resultados esperados
        </SectionSubtitle>
        <ul>
          {adventure?.expectedResults.map((result, i) => (
            <Typography key={i} className="mb-1" component="li">
              {result}
            </Typography>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverviewTab;
