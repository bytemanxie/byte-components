import React, { FC, ReactNode } from 'react'

export interface TabItemProps {
  /** Text or element displayed on the tab */
  label: string | React.ReactElement;
  /** Whether the tab is disabled */
  disabled?: boolean;
  children?: ReactNode;
}

export const TabItem: FC<TabItemProps> = ({ children }) => {
  return (
    <div className="viking-tab-panel">
      {children}
    </div>
  )
}

export default TabItem;