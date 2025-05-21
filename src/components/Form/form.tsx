import React, { ReactNode, createContext, forwardRef, useImperativeHandle } from 'react'
import { ValidateError } from 'async-validator'
import useStore, { FormState }from './useStore';
export type RenderProps = (form: FormState) => ReactNode
export interface FormProps {
  /** Form name, will be used as prefix for form field ids */
  name?: string;
  /** Form default values, only takes effect during initialization and reset */
  initialValues?: Record<string, any>;
  children?: ReactNode | RenderProps;
  /** Callback after submitting the form and the data validation is successful */
  onFinish?: (values: Record<string, any>) => void;
  /** Callback after submitting the form and the data validation has failed */
  onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}
export type IFormContext = 
  Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'>
  & Pick<FormProps, 'initialValues'>
export type IFormRef = Omit<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'form'>
export const FormContext = createContext<IFormContext>({} as IFormContext)
export const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
  const { name = 'byte_form', children, initialValues, onFinish, onFinishFailed } = props
  const { form, fields, dispatch, ...restProps } = useStore(initialValues)
  const { validateField, validateAllFields } = restProps
  useImperativeHandle(ref, () => {
    return {
      ...restProps
    }
  })
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField
  }
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { isValid, errors, values } = await validateAllFields()
    if (isValid && onFinish) {
      onFinish(values)
    } else if(!isValid && onFinishFailed) {
      onFinishFailed(values, errors)
    }
  }
  let childrenNode: ReactNode
  if (typeof children === 'function') {
    childrenNode = children(form)
  } else {
    childrenNode = children
  }
  return (
    <form name={name} className="byte-form" onSubmit={submitForm}>
      <FormContext.Provider value={passedContext}>
        {childrenNode}
      </FormContext.Provider>
    </form>
  )
})
// Default props are set via destructuring in the component parameters

export default Form
