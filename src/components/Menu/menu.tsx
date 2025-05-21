import React, { FC, useState, createContext, CSSProperties, ReactNode } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
export interface MenuProps {
  /** Default active menu item index */
  defaultIndex?: string;
  className?: string;
  /** Menu type: horizontal or vertical */
  mode?: MenuMode;
  style?: CSSProperties;
  /** Callback function triggered when menu item is clicked */
  onSelect?: (selectedIndex: string) => void;
  /** Set default open submenus, only works in vertical mode */
  defaultOpenSubMenus?: string[];
  children?: ReactNode;
}
interface IMenuContext {
  index: string;
  onSelect?: (selectedIndex: string) => void;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];  
}

export const MenuContext = createContext<IMenuContext>({index: '0'})
/**
 * Menu component providing navigation functionality for websites. Supports horizontal and vertical modes, as well as dropdown menus.
 * 
 * ```jsx
 * import { Menu } from 'byteship'
 * 
 * // Then you can use Menu.Item and Menu.Submenu to access menu items and dropdown components
 * ```
 */
export const Menu: FC<MenuProps> = (props) => {
  const { 
    className, 
    mode = 'horizontal', 
    style, 
    children, 
    defaultIndex = '0', 
    onSelect, 
    defaultOpenSubMenus = [] 
  } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('byte-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const handleClick = (index: string) => {
    setActive(index)
    if(onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
// Using default parameters in the function signature instead of defaultProps

export default Menu;