import React, { useState, useEffect } from 'react';
import { FetchStatus } from 'global/enums';
import { Button, CircularProgress, Typography } from '@mui/material';
import { AllCompletedAdventuresContainer } from './styled';
import { useClassContext } from '../context';
import AdventureCard from 'components/AdventureCard';
import { useNavigate } from 'react-router-dom';
import SkillPoints from 'components/SkillPoints';
import { IClassHasAdventure } from 'global/interfaces';
import { Link } from 'react-router-dom';
import { getCompletedClassHasAdventuresByClass } from 'services/adventures';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import moment from 'moment';

const AllCompletedAdventures: React.FC = () => {
  const { classDetails, loadingClass } = useClassContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(FetchStatus.Idle);
  const [completedAdventures, setCompletedAdventures] = useState<
    IClassHasAdventure[]
  >([]);

  useEffect(() => {
    if (classDetails?.id) {
      setLoading(FetchStatus.Pending);
      getCompletedClassHasAdventuresByClass(classDetails.id)
        .then((response) => {
          setCompletedAdventures(response.data);
          setLoading(FetchStatus.Success);
        })
        .catch((e) => {
          console.log(e);
          setLoading(FetchStatus.Error);
        });
    }
  }, [classDetails]);

  if (
    (loadingClass !== FetchStatus.Success &&
      loadingClass !== FetchStatus.Error) ||
    (loading !== FetchStatus.Success && loading !== FetchStatus.Error)
  ) {
    return (
      <div className="d-flex w-100 align-items-center justify-content-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <AllCompletedAdventuresContainer className="p-5">
      <div>
        <Button
          className="mb-2"
          component={Link}
          to={`/app/cursos/${classDetails?.id}/aventuras/iniciar`}
          startIcon={
            <ArrowBackIosIcon
              sx={{ fontSize: '14px!important' }}
              fontSize="small"
            />
          }
        >
          Volver a selección de aventuras
        </Button>
      </div>
      <Typography component="h1" variant="h4" className="fw-bold mb-4">
        {classDetails.alias} - Aventuras finalizadas
      </Typography>
      <div className="d-flex h-100 w-100 align-items-center justify-content-start flex-wrap gap-4">
        {completedAdventures.map((classHasAdventure, index) => (
          <AdventureCard
            id={`adventure-card-${index}`}
            demo
            startDate={moment(classHasAdventure.date_start).format(
              'DD/MM/YYYY'
            )}
            endDate={moment(classHasAdventure.date_stop).format('DD/MM/YYYY')}
            onClick={() =>
              navigate(
                `/app/cursos/${classDetails.id}/aventuras/completed/${classHasAdventure.id}`
              )
            }
            key={index}
            title={classHasAdventure.adventure.title}
            img={classHasAdventure.adventure.thumbnail}
            info={
              <div className="d-flex gap-1 flex-wrap">
                {!!classHasAdventure.adventure?.skills?.length
                  ? classHasAdventure.adventure.skills.map(
                      (adventureSkill, index) => (
                        <SkillPoints
                          key={`${adventureSkill.id}-${adventureSkill.title}-${index}`}
                          skill={adventureSkill}
                        />
                      )
                    )
                  : null}
              </div>
            }
          />
        ))}
      </div>
    </AllCompletedAdventuresContainer>
  );
};

export default AllCompletedAdventures;
