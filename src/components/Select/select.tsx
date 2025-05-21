import React, { FC, useState, createContext, useRef, FunctionComponentElement, useEffect, ReactNode } from 'react'
import classNames from 'classnames'
import Input from '../Input'
import Icon from '../Icon'
import useClickOutside from '../../hooks/useClickOutside'
import Transition from '../Transition/transition'
import { SelectOptionProps } from './option'

export interface SelectProps {
  /** Specify default selected items, can be a string or array of strings */
  defaultValue?: string | string[];
  /** Default text for the select box */
  placeholder?: string;
  /** Whether the Select is disabled */
  disabled?: boolean;
  /** Whether to support multiple selection */
  multiple?: boolean;
  /** The name attribute of the select input */
  name?: string;
  /** Callback when selected value changes */
  onChange?: (selectedValue: string, selectedValues: string[]) => void;
  /** Callback when dropdown appears/disappears */
  onVisibleChange?: (visible: boolean) => void;
  /** Width of the select component */
  width?: string | number;
  children?: ReactNode;
}

export interface ISelectContext {
  onSelect?: (value: string, isSelected?: boolean) => void;
  selectedValues: string[];
  multiple?: boolean;
}

export const SelectContext = createContext<ISelectContext>({ selectedValues: []})
/**
 * Dropdown selector.
 * Displays a dropdown menu for user selection, used to replace native selectors or when a more elegant multi-selector is needed.
 * 
 * ### Usage
 * 
 * ```jsx
 * import { Select } from 'byteship'
 * // Then you can use <Select> and <Select.Option>
 * ```
 */
export const Select:FC<SelectProps> = (props) => {
  const {
    defaultValue,
    placeholder = 'Please select',
    children,
    multiple,
    name = 'byte-select',
    disabled,
    onChange,
    onVisibleChange,
    width,
  }= props
  const input = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const containerWidth = useRef(0)
  const [ selectedValues, setSelectedValues ] = useState<string[]>(Array.isArray(defaultValue)? defaultValue :[])
  const [ menuOpen, setOpen ] = useState(false)
  const [ value, setValue ] = useState(typeof defaultValue === 'string' ? defaultValue : '')
  const handleOptionClick = (value: string, isSelected?: boolean) => {
    // update value
    if (!multiple) {
      setOpen(false)
      setValue(value)
      if (onVisibleChange) {
        onVisibleChange(false)
      }
    } else {
      setValue('')
    }
    let updatedValues = [value]
    // click again to remove selected when is multiple mode
    if (multiple) {
      updatedValues = isSelected ? selectedValues.filter((v) => v !== value) :  [...selectedValues, value]
      setSelectedValues(updatedValues)
    } 
    if(onChange) {
      onChange(value, updatedValues)
    }

  }
  useEffect(() => {
    // focus input
    if (input.current) {
      input.current.focus()
      if (multiple && selectedValues.length > 0) {
        input.current.placeholder = ''
      } else {
        if (placeholder) input.current.placeholder = placeholder
      }
    }
  }, [selectedValues, multiple, placeholder])
  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current = containerRef.current.getBoundingClientRect().width
    }
  })
  // Use type assertion to ensure the ref is compatible with useClickOutside
  useClickOutside(containerRef as React.RefObject<HTMLElement>, () => { 
    setOpen(false)
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false)
    }
  })
  const passedContext: ISelectContext = {
    onSelect: handleOptionClick,
    selectedValues: selectedValues,
    multiple: multiple,
  }
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!disabled) {
      setOpen(!menuOpen)
      if (onVisibleChange) {
        onVisibleChange(!menuOpen)
      }
    }

  }
  const generateOptions = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<SelectOptionProps>
      if (childElement.type.displayName === 'Option') {
        return React.cloneElement(childElement, {
          index: `select-${i}`
        })
      } else {
        console.error("Warning: Select has a child which is not a Option component")
      }
    })
  }
  const containerClass = classNames('byte-select', {
    'menu-is-open': menuOpen,
    'is-disabled': disabled,
    'is-multiple': multiple,
  })
  const containerStyle = width ? { width: width } : {}
  
  return (
    <div className={containerClass} ref={containerRef} style={containerStyle}>
      <div className="byte-select-input" onClick={handleClick}>
        <Input
          ref={input}
          placeholder={placeholder} 
          value={value} 
          readOnly 
          icon="angle-down"
          disabled={disabled}
          name={name}
        />
      </div>
      <SelectContext.Provider value={passedContext}>
        <Transition
            in={menuOpen}
            animation="zoom-in-top"
            timeout={300}
          >
          <ul className="byte-select-dropdown">
            {generateOptions()}
          </ul>
        </Transition>
      </SelectContext.Provider>
      {multiple &&
        <div className="byte-selected-tags" style={{maxWidth: containerWidth.current - 32}}> 
          {
            selectedValues.map((value, index) => {
              return (
                <span className="byte-tag" key={`tag-${index}`}>
                  {value}
                  <Icon icon="times" onClick={() => {handleOptionClick(value, true)}} />
                </span>
              )
            })
          }
        </div>
      }

    </div>
  )
}
// Using default parameters instead of defaultProps for better TypeScript support
export default Select;