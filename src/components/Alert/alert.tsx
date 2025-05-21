import React, { FC, useState } from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import Transition from '../Transition'
export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
  /**Title */
  title: string;
  /**Description */
  description?: string;
  /**Type - four options for different scenarios */
  type?: AlertType;
  /**Event triggered when closing the alert */
  onClose?: () => void;
  /**Whether to show close icon */
  closable?: boolean;
}

/** 
 * Used to display important prompt information on the page. Click the X on the right to make the prompt automatically disappear.
 * ### Import
 * 
 * ~~~js
 * import { Alert } from 'byteship'
 * ~~~
*/
export const Alert: FC<AlertProps> = ({
  title,
  description,
  type = 'default',
  onClose,
  closable = true
}) => {
  const [hide, setHide] = useState(false)
  const classes = classNames('byte-alert', {
    [`byte-alert-${type}`]: type,
  })
  const titleClass = classNames('byte-alert-title', {
    'bold-title': description
  })
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose()
    }
    setHide(true)
  }
  return (
    <Transition
      in={!hide}
      timeout={300}
      animation="zoom-in-top"
    >
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description && <p className="byte-alert-desc">{description}</p>}
        {closable && <span className="byte-alert-close" onClick={handleClose}><Icon size="xs" icon="times" /></span>}
      </div>
    </Transition>
  )
}

export default Alert;