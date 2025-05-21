import React, { ReactElement, InputHTMLAttributes, ChangeEvent, forwardRef } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**Whether to disable the Input */
  disabled?: boolean;
  /**Set input size, supports lg or sm */
  size?: InputSize;
  /**Add an icon, floating on the right side, used for hints */
  icon?: IconProp;
  /**Add prefix for configuring fixed combinations */
  prepend?: string | ReactElement;
  /**Add suffix for configuring fixed combinations */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input component for entering content via mouse or keyboard, a basic form field wrapper.
 * 
 * ~~~js
 * // Import like this
 * import { Input } from 'vikingship'
 * ~~~
 * 
 * Supports all basic properties of HTMLInput
 */
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props
  const cnames = classNames('byte-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={cnames} style={style}>
      {prepend && <div className="byte-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
      <input
        ref={ref}
        className="byte-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="byte-input-group-append">{append}</div>}
    </div>
  )
})

export default Input;