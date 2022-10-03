import React from 'react';
import { SectionSubtitleProps } from './interfaces';
import { SectionSubtitleContainer } from './styled';

const SectionSubtitle: React.FC<SectionSubtitleProps> = ({ children, backgroundColor, textColor }) => (
  <SectionSubtitleContainer textColor={textColor} backgroundColor={backgroundColor}>
    <div>{children}</div>
    <hr />
  </SectionSubtitleContainer>
);

export default SectionSubtitle;
