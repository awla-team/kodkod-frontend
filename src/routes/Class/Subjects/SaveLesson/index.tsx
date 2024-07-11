import { TextField } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import WaterIcon from '@mui/icons-material/Water';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import kodkod from 'assets/images/kodcoin.png';

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { type IUnit } from 'components/Modals/ViewLearningGoalsDialog/interfaces';
import StaticRewardCard from 'components/RewardCard/StaticRewardCard';

const SaveLesson: React.FC<{
  selectedUnit: IUnit;
  handleClose: () => void;
}> = ({ selectedUnit, handleClose }) => {
  useEffect(() => {});

  return (
    <div className='tw-space-y-6'>
      <div
        className='tw-flex tw-items-center tw-justify-between'
        onClick={handleClose}
      >
        <Link className='fw-bold tw-flex'>{'< Volver a lista de clases'}</Link>
      </div>

      <h5 className='tw-flex tw-gap-4'>
        {selectedUnit.title.includes('Unidad')
          ? selectedUnit.title
          : 'Unidad ' + selectedUnit.title}
      </h5>
      <TextField
        className=''
        variant='standard'
        placeholder='Inserte el título de la clase'
        fullWidth
      />
      <h5 className='tw-flex tw-mx-4 tw-my-4'>
        1. Tus estudiantes completan al menos 2 desafíos de la clase
      </h5>
      <div className='tw-border tw-border-dashed tw-rounded-md tw-h-40 tw-flex tw-justify-between tw-items-center hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
        <div className='tw-justify-center tw-items-center tw-w-[100px] tw-h-full tw-py-0 tw-px-6 tw-flex tw-flex-col tw-gap-1tw-flex tw-bg-[#0E8A1A] tw-text-white tw-rounded-l-md tw-border-y-2 tw-border-transparent'>
          <BoltIcon />
          Inicio
        </div>
        <div className='tw-flex tw-justify-center tw-items-center'>
          <AddCircleOutlinedIcon />
          <span className='tw-text-sm tw-mx-2 tw-font-semibold'>
            Agregar una clase
          </span>
        </div>
        <></>
      </div>
      <div className='tw-border tw-border-dashed tw-rounded-md tw-h-40 tw-flex tw-justify-between tw-items-center hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
        <div className='tw-justify-center tw-items-center tw-w-[100px] tw-h-full tw-py-0 tw-px-6 tw-flex tw-flex-col tw-gap-1tw-flex tw-bg-[#0E138A] tw-text-white tw-rounded-l-md tw-border-y-2 tw-border-transparent'>
          <PsychologyIcon />
          Desarrollo
        </div>
        <div className='tw-flex tw-justify-center tw-items-center'>
          <AddCircleOutlinedIcon />
          <span className='tw-text-sm tw-mx-2 tw-font-semibold'>
            Agregar una clase
          </span>
        </div>
        <></>
      </div>
      <div className='tw-border tw-border-dashed tw-rounded-md tw-h-40 tw-flex tw-justify-between tw-items-center hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
        <div className='tw-justify-center tw-items-center tw-w-[100px] tw-h-full tw-py-0 tw-px-6 tw-flex tw-flex-col tw-gap-1tw-flex tw-bg-[#8A0E0E] tw-text-white tw-rounded-l-md tw-border-y-2 tw-border-transparent'>
          <WaterIcon />
          Cierre
        </div>
        <div className='tw-flex tw-justify-center tw-items-center'>
          <AddCircleOutlinedIcon />
          <span className='tw-text-sm tw-mx-2 tw-font-semibold'>
            Agregar una clase
          </span>
        </div>
        <></>
      </div>

      <h5 className='tw-flex tw-mx-4 tw-my-4'>
        2. Al completarlos, ¡pueden elegir una recompensa!
      </h5>
      <div className='tw-grid tw-grid-cols-3 tw-gap-20'>
        <div className='tw-border tw-mx-6 tw-border-dashed tw-rounded-md tw-h-80 tw-w-60 tw-flex tw-justify-center tw-items-center tw-flex-col hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
          <AddCircleOutlinedIcon />
          <span className='tw-text-sm tw-font-semibold'>
            Añade una recompensa
          </span>
        </div>
        <div className='tw-border tw-border-dashed tw-rounded-md tw-h-80 tw-w-60 tw-flex tw-justify-center tw-items-center tw-flex-col hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
          <AddCircleOutlinedIcon />
          <span className='tw-text-sm tw-font-semibold'>
            Añade una recompensa
          </span>
        </div>
        <div className='tw-border tw-border-dashed tw-rounded-md tw-h-80 tw-w-60 tw-flex tw-justify-center tw-items-center tw-flex-col hover:tw-cursor-pointer tw-transition-all tw-duration-200 tw-ease-in-out tw-bg-transparent hover:tw-bg-indigo-100'>
          <AddCircleOutlinedIcon />
          <span className='tw-text-sm tw-font-semibold'>
            Añade una recompensa
          </span>
        </div>
      </div>
      <StaticRewardCard
        description='Descripcion de Prueba'
        icon={kodkod}
        title='Test'
      />
      <h5 className='tw-flex tw-mx-4 tw-my-4'>
        3. Las recompensas pueden utilizarse en los últimos 15 minutos de la
        clase. ¡Buena suerte!
      </h5>
      <div className='tw-flex tw-items-center tw-justify-end tw-mx-6'>
        <button type='button' className='tw-mx-6 tw-bg-gray-200 text-black'>
          Cancelar
        </button>
        <button type='button' className='tw-bg-gray-500'>
          Añadir unidad
        </button>
      </div>
    </div>
  );
};

export default SaveLesson;
