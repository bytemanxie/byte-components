import React, { FC, useState, FunctionComponentElement, ReactNode } from 'react'
import classNames from 'classnames'
import { TabItemProps } from './tabItem'
export interface TabsProps {
  /** Current active tab panel index, default is 0 */
  defaultIndex?: number;
  /** Additional className for styling */
  className?: string;
  /** Callback function triggered when tab is clicked */
  onSelect?: (selectedIndex: number) => void;
  /** Tab style type, two options available, default is 'line' */
  type?: 'line' | 'card';
  children?: ReactNode;
}

/**
 * Tab switching component.
 * Provides a way to organize and display large content areas while keeping the interface clean.
 * 
 * ### Usage
 * 
 * ```jsx
 * import { Tabs } from 'byteship'
 * ```
 */
export const Tabs: FC<TabsProps> = (props) => {
  const {
    defaultIndex = 0,
    className,
    onSelect,
    children,
    type = 'line'
  } = props
  const [ activeIndex, setActiveIndex ] = useState(defaultIndex)
  const handleClick = (e: React.MouseEvent, index: number, disabled: boolean | undefined) => {
    if (!disabled) {
      setActiveIndex(index)
      if (onSelect) {
        onSelect(index)
      }
    }
  }
  const navClass = classNames('byte-tabs-nav', {
    'nav-line': type === 'line',
    'nav-card': type === 'card',
  })
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>
      const { label, disabled } = childElement.props
      const classes = classNames('byte-tabs-nav-item', {
        'is-active': activeIndex === index,
        'disabled': disabled,
      })
      return (
        <li 
          className={classes} 
          key={`nav-item-${index}`}
          onClick={(e) => {handleClick(e, index, disabled)}}
        >
          {label}
        </li>
      )
    })
  }
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === activeIndex) {
        return child
      }
    })
  }
  return (
    <div className={`byte-tabs ${className ? className : ''}`}>
      <ul className={navClass}>
        {renderNavLinks()}
      </ul>
      <div className="byte-tabs-content">
        {renderContent()}
      </div>
    </div>
  )
}

// Using default parameters instead of defaultProps for better TypeScript support
export default Tabs;