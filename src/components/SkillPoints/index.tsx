import styled from 'styled-components';
import { skillsMap } from '../../global/constants';
import { ISkillsMap } from '../../global/interfaces';
import Point from '../Point';
import { ISkillPointsProps } from './interfaces';
import { SkillPointsContainer } from './styled';

const SkillPoints = ({ skill, points }: ISkillPointsProps) => (
    <SkillPointsContainer className="d-flex align-items-center mb-1">
        <img src={skillsMap[skill as keyof ISkillsMap].img} className="me-2" />
        <span className="me-3">{skillsMap[skill as keyof ISkillsMap].text}</span>
        <div className="d-flex">
            <Point highlighted={points > 0} />
            <Point highlighted={points > 1} />
            <Point highlighted={points > 2} />
        </div>                        
    </SkillPointsContainer>
)

export default SkillPoints;