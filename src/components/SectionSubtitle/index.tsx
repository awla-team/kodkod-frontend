import React from 'react';
import { SectionSubtitleProps } from './interfaces';
import { SectionSubtitleContainer } from './styled';

const SectionSubtitle: React.FC<SectionSubtitleProps> = ({ children, lineColor, textColor, filled }) => (
  <SectionSubtitleContainer textColor={textColor} lineColor={lineColor} filled={filled}>
    <div>{children}</div>
    <hr />
  </SectionSubtitleContainer>
);

export default SectionSubtitle;
