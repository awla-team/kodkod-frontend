import React, { useState, useEffect} from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getAdventure } from "../../../services/adventures";
import { IAdventure } from "../../../global/interfaces";
import { Button, Chip, Typography } from "@mui/material";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import SkillPoints from "../../../components/SkillPoints";

const AdventureContainer = styled.div`
  position: relative;
  margin-top: 36px;
  color: #fff;
  .adventure-banner {
    box-shadow: inset 10px 10px 300px 40px #000;
    position: absolute;    
    border-radius: 16px;
    top: 0;
    left: 0;
    z-index: -1;    
    filter: brightness(0.7);
  }
`;

const Adventure: React.FC = () => {
  const [adventure, setAdventure] = useState<IAdventure>();
  const { adventureId } = useParams();  

  useEffect(() => {
    if (adventureId) {
      getAdventure(adventureId)
      .then(({ data }) => setAdventure(data))
      .catch((e) => console.log(e))
    }    
  }, [adventureId]);

  return (
    <div>
      {adventure ? (
        <AdventureContainer>
          <div className="d-flex flex-column p-lg-5">
            <div className="mb-5">
              <Button color="info" startIcon={<ChevronLeftRoundedIcon />}>Volver a Aventuras</Button>
            </div>            
            <div className="mb-3">
              <Chip color="info" label="Previsualización" />
            </div>
            <div className="mb-2">
              <Typography variant="h3" component="h2" fontWeight="bold">{adventure.title}</Typography>
            </div>
            <div className="d-flex">
              {Object.entries(adventure.skills).map((entry) => (
                <div key={`${adventure.id}-${entry[0]}`} className="me-4">
                  <SkillPoints skill={entry[0]} points={entry[1]} />
                </div>                
              ))}
            </div>
            <img className="adventure-banner" src={adventure.banner} />
          </div>          
        </AdventureContainer>
      ) : null}
    </div>
  );
};

export default Adventure;
