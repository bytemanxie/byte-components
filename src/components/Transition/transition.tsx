import React, { ReactNode, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName,
  wrapper?: boolean,
  children?: ReactNode
}

const Transition: React.FC<TransitionProps> = (props) => {
  // Apply default props
  props = { ...defaultProps, ...props }
  const {
    children,
    classNames,
    animation,
    wrapper,
    ...restProps
  } = props
  const nodeRef = useRef(null)
  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames = { classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div ref={nodeRef}>{children}</div> : 
        // For non-element children, wrap them in a div with the ref
        <div ref={nodeRef}>{children}</div>
      }
    </CSSTransition>
  )
}
// Using default parameters in the function signature instead of defaultProps
const defaultProps = {
  unmountOnExit: true,
  appear: true,
}

export default Transition