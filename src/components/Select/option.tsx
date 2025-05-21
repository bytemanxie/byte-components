import React, { FC, useContext, ReactNode } from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import { SelectContext } from './select'
export interface SelectOptionProps {
  index?: string;
  /** Default value used for filtering, must be unique */
  value: string;
  /** Option label, defaults to value if not set */
  label?: string;
  /** Whether to disable this option */
  disabled?: boolean;
  children?: ReactNode;
}

export const Option: FC<SelectOptionProps> = ({value, label, disabled, children, index}) => {
  const { onSelect, selectedValues, multiple } = useContext(SelectContext)
  const isSelected = selectedValues.includes(value)
  const classes = classNames('byte-select-item', {
    'is-disabled': disabled,
    'is-selected': isSelected,
  })
  const handleClick = (e: React.MouseEvent, value: string, isSelected: boolean) => {
    e.preventDefault()
    if(onSelect && !disabled) {
      onSelect(value, isSelected)
    }
  }
  return (
    <li key={index} className={classes} onClick={(e) => {handleClick(e, value, isSelected)}}>
      {children || (label ? label: value)}
      {multiple && isSelected && <Icon icon="check"/>}
    </li>
  )
}

Option.displayName = 'Option'

export default Option;