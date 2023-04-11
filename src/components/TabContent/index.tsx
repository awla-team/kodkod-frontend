import React from 'react';
import { TabContentProps } from './interfaces';

const TabContent: React.FC<TabContentProps> = ({ children, className, value, index, onClick }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ padding: '32px' }}
      className={`w-100 overflow-auto ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default TabContent;
