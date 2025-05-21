import React, { FC, ReactNode, useContext, useEffect } from 'react'
import classNames from 'classnames'
import { FormContext } from './form'
import { CustomRule } from './useStore'
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>
export interface FormItemProps {
  /** Field name */
  name: string;
  /** Text of the label */
  label?: string;
  children?: ReactNode;
  /** Value property of child node, such as 'checked' for checkbox */
  valuePropName?: string;
  /** Set when to collect field value change */
  trigger?: string;
  /** Set how to convert event value to field value */
  getValueFromEvent?: (event: any) => any;
  /** Validation rules for field. See async validator for more rules */
  rules?: CustomRule[];
  /** Set when to validate the field */
  validateTrigger?: string;
}

export const FormItem: FC<FormItemProps> = (props) => {
  const {
    label,
    children,
    name,
    valuePropName = 'value',
    trigger = 'onChange',
    getValueFromEvent = (e) => e.target.value,
    rules,
    validateTrigger = 'onBlur'
  } = props
  const { dispatch, fields, initialValues, validateField } = useContext(FormContext)
  const rowClass = classNames('byte-row', {
    'byte-row-no-label': !label
  })
  useEffect(() => {
    const value = (initialValues && initialValues[name]) || ''
    dispatch({ type: 'addField', name, value: { label, name, value, rules: rules || [], errors: [], isValid: true } })
  }, [])
  const fieldState = fields[name]
  const value = fieldState && fieldState.value
  const errors = fieldState && fieldState.errors
  const isRequired = rules?.some(rule => (typeof rule !== 'function') && rule.required)
  const hasError = errors && errors.length > 0
  const labelClass = classNames({
    'byte-form-item-required': isRequired
  })
  const itemClass = classNames('byte-form-item-control', {
    'byte-form-item-has-error': hasError
  })
  const onValueUpdate = (e: any) => {
    const value = getValueFromEvent(e)
    console.log('new value', value)
    dispatch({ type: 'updateValue', name, value })
  }
  const onValueValidate = async () => {
    await validateField(name)
  }
  const controlProps: Record<string, any> = {}
  controlProps[valuePropName] = value
  controlProps[trigger] = onValueUpdate
  if (rules) {
    controlProps[validateTrigger] = onValueValidate
  }
  // Get the first element of the children array
  const childList = React.Children.toArray(children)
  // No child component
  if (childList.length === 0) {
    console.error('No child element found in Form.Item, please provide one form component')
    return null
  }
  // More than one child component
  if (childList.length > 1) {
    console.warn('Only support one child element in Form.Item, others will be omitted')
  }
  // Not a ReactElement child component
  if (!React.isValidElement(childList[0])) {
    console.error('Child component is not a valid React Element')
    return null
  }
  // Cast to ReactElement and ensure props is treated as an object
  const child = childList[0] as React.ReactElement

  // Create merged props object explicitly to avoid type spreading issues
  const mergedProps = Object.assign({}, child.props || {}, controlProps)

  // Clone element with the merged props
  const returnChildNode = React.cloneElement(child, mergedProps)
  return (
    <div className={rowClass}>
      {label &&
        <div className='byte-form-item-label'>
          <label title={label} className={labelClass}>
            {label}
          </label>
        </div>
      }
      <div className='byte-form-item'>
        <div className={itemClass}>
          {returnChildNode}
        </div>
        {hasError &&
          <div className='byte-form-item-explain'>
            <span>{errors[0].message}</span>
          </div>
        }
      </div>
    </div>
  )
}

// Default props are now set via destructuring in the component parameters
export default FormItem