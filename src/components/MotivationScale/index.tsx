import React, { useMemo } from 'react';
import fire20 from 'assets/images/fire-20.png';
import fire40 from 'assets/images/fire-40.png';
import fire60 from 'assets/images/fire-60.png';
import fire80 from 'assets/images/fire-80.png';

import { cn } from 'utils/methods';

const SCALES = [
  { min: 1, max: 20, label: 'Muy baja' },
  { min: 21, max: 40, label: 'Baja' },
  { min: 41, max: 60, label: 'Media' },
  { min: 61, max: 80, label: 'Alta' },
  { min: 81, max: 100, label: 'Muy alta' },
];

const ICONS = [
  { icon: fire20, value: 20, position: 16 },
  { icon: fire40, value: 40, position: 36 },
  { icon: fire60, value: 60, position: 56 },
  { icon: fire80, value: 80, position: 76 },
];

interface Props {
  motivationLevel: number;
}

/**
 * MotivationScale component displays the motivation level of a course.
 * It shows a label indicating the motivation level and a visual representation
 * of the motivation scale with icons and a progress bar.
 *
 * @component
 * @param {number} props.motivationLevel - The current motivation level of the course.
 *
 * @returns {JSX.Element} The rendered MotivationScale component.
 *
 * @example
 * <MotivationScale motivationLevel={75} />
 */
const MotivationScale: React.FC<Props> = ({ motivationLevel }) => {
  const activeScale = useMemo(
    () =>
      SCALES.find(
        ({ min, max }) => motivationLevel >= min && motivationLevel <= max
      ),
    [motivationLevel]
  );

  const hiddenPercentage = useMemo(() => {
    return 100 - motivationLevel;
  }, [motivationLevel]);

  return (
    <div className='tw-flex tw-justify-between tw-items-center tw-gap-2'>
      <div>
        <span>Motivación del curso</span>
        <h4 className='tw-font-bold tw-text-2xl'>{activeScale?.label}</h4>
      </div>

      <div className='tw-grow tw-flex tw-justify-end'>
        <div className='tw-h-10 tw-bg-zinc-100 tw-rounded-full tw-py-2.5 tw-px-3 tw-w-2/3 tw-relative'>
          <div className='tw-relative tw-rounded-full tw-h-full tw-flex tw-items-center tw-motivation-full-gradient px-2'>
            <div className='tw-h-[1px] tw-w-full tw-bg-white' />

            {/* Iconos posicionados */}
            {ICONS.map(({ icon, value, position }, index) => (
              <img
                key={index}
                src={icon}
                alt={`icon-${index}`}
                className={cn(
                  'tw-h-10 tw-object-contain tw-absolute -tw-top-4 tw-z-20',
                  {
                    'tw-hidden': value > motivationLevel,
                  }
                )}
                style={{ left: `${position}%` }}
              />
            ))}

            {/* Progreso oculto */}
            <div className='tw-w-full tw-h-full tw-absolute tw-top-0 tw-left-0 tw-z-10 tw-flex tw-justify-end'>
              <div
                className='tw-h-full tw-bg-zinc-100'
                style={{ width: `${hiddenPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationScale;
