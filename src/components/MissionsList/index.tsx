import { type FC, useState, useEffect } from 'react';
import { MissionListContainer } from './styled';
import MissionCard from 'components/MissionCard';
import { type IMission, type IStage } from 'global/interfaces';
import { Typography } from '@mui/material';
import MissionAccomplishedDrawer from 'components/Modals/MissionAccomplished';
import { getStageMissions } from 'services/missions';

const MissionsList: FC<{ shownStage: IStage }> = ({ shownStage }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [selectedMission, setSelectedMission] = useState<IMission>();
  const [missions, setMissions] = useState<IMission[]>([]);
  // const [sortedMissions, setSortedMissions] = useState<IMission[]>([]);
  const [reloadMissions, setReloadMissions] = useState(false);

  useEffect(() => {
    if (shownStage) {
      // FIXME: fix this eslint error
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      handleGetMissions(shownStage.id);
    }

    return () => {
      setReloadMissions(false);
    };
  }, [shownStage, reloadMissions]);

  const updateMissions = () => {
    setReloadMissions(true);
  };

  const handleGetMissions = async (stageId: number | string) => {
    const response = await getStageMissions(stageId);
    // FIXME: fix this eslint error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setMissions(response.data.responseData);
  };

  const handleOpen = (missionDetails: IMission) => {
    setSelectedMission(missionDetails);
    setOpen(true);
  };

  const handleClose = (reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <MissionListContainer id='adventure-missions' className='p-5'>
      <Typography
        component='h6'
        variant='h6'
        fontWeight='bold'
        className='mb-5'
      >
        Lista de misiones
      </Typography>

      <div className='row g-5'>
        {missions?.length ? (
          missions?.map((res, index) => {
            return (
              <div key={`mission-${index}`} className='col-lg-6 col-12'>
                <MissionCard
                  id={index}
                  onClick={() => {
                    setOpenDrawer(true);
                    setSelectedMission(res);
                  }}
                  clickable
                  mission={res}
                  openModal={handleOpen}
                  stage={{ ...shownStage, missions }}
                  updateMissions={updateMissions}
                />
              </div>
            );
          })
        ) : (
          <Typography>Esta etapa aún no tiene misiones</Typography>
        )}
      </div>

      {/* {open && !!selectedMission && (
        <ReplaceMissionModal
          open={open && !!selectedMission}
          onClose={handleClose}
          mission={selectedMission}
          stage={{ ...shownStage, missions }}
        />
      )} */}
      <MissionAccomplishedDrawer
        open={openDrawer && !!selectedMission}
        onSave={handleGetMissions}
        anchor='right'
        onClose={handleDrawerClose}
        mission={selectedMission}
        stage={shownStage}
      />
    </MissionListContainer>
  );
};
export default MissionsList;
