import React, { FC } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  /** Theme support - displays different colors based on the selected theme */
  theme? : ThemeProps
}

/**
 * Provides a set of commonly used icons based on react-fontawesome.
 * 
 * Supports all properties of react-fontawesome. You can find more information at https://github.com/FortAwesome/react-fontawesome#basic
 * 
 * Supports all fontawesome free-solid-icons. You can view all available icons at https://fontawesome.com/icons?d=gallery&s=solid&m=free
 * 
 * ### Usage
 * 
 * ```jsx
 * import { Icon } from 'byteship'
 * ```
 */
export const Icon: FC<IconProps> = (props) => {
  // icon-primary
  const { className, theme, ...restProps } = props
  const classes = classNames('byte-icon', className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  )
}

export default Icon;