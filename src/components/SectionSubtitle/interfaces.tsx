export interface SectionSubtitleContainerProps {
  textColor?: string;
  lineColor?: string;
  filled?: boolean;
}

export interface SectionSubtitleProps
  extends React.PropsWithChildren,
    SectionSubtitleContainerProps {}
