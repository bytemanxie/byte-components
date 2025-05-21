import React, { useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Form, { IFormRef } from './form'
import Item from './formItem'
import Input from '../Input'
import Button from '../Button'
import Select from '../Select'
import { CustomRule } from './useStore'

const meta = {
  title: 'Components/Form',
  id: 'Form',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: "code",
      },
    }
  },
  tags: ['autodocs'],
  subcomponents: { 'Item': Item },
  decorators: [
    (Story) => (
      <div style={{ width: '550px' }}>
        <Story />
      </div>
    ),
  ]
} satisfies Meta<typeof Form>
export default meta

type Story = StoryObj<typeof meta>
const confirmRules: CustomRule[] = [
  { type: 'string', required: true, min: 3, max: 8 },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value) {
      console.log('the value', getFieldValue('password'))
      console.log(value)
      return new Promise((resolve, reject) => {
        if (value !== getFieldValue('password')) {
          reject('The two passwords that you entered do not match!')
        }
        setTimeout(() => {
          resolve()
        }, 1000)
      })

    }
  })
]
export const ABasicForm: Story = {
  render: (args) => {
    return (
      <Form {...args} >
        <Item label='Username' name='name' rules={[{ type: 'string', required: true, min: 3 }]}>
          <Input />
        </Item>
        <Item label='Password' name='password' rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
          <Input type="password" />
        </Item>
        <div className='byte-form-submit-area'>
          <Button type="submit" btnType='primary'>Login</Button>
        </div>
      </Form>
    )
  },
  name: 'Basic Login Form'
}

export const BRegForm: Story = {
  render: (args) => {
    const initialValues = {
      agreement: false
    }
    return (
      <Form {...args} initialValues={initialValues}>
        <Item label='Email' name='email' rules={[{ type: 'email', required: true }]}>
          <Input />
        </Item>
        <Item label='Password' name='password' rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
          <Input type="password" />
        </Item>
        <Item
          label='Gender'
          name='gender'
          rules={[{ type: 'string', required: true }]}
          getValueFromEvent={(e) => e}
          valuePropName='defaultValue'
        >
          <Select
            placeholder="Please select gender"
            width={350}
          >
            <Select.Option value="Male" />
            <Select.Option value="Female" />
          </Select>
        </Item>
        <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center' }}>
          <Item
            name='agreement'
            rules={[{ type: 'enum', enum: [true], message: 'Please agree to the terms' }]}
            getValueFromEvent={(e) => e.target.checked}
            valuePropName='checked'
          >
            <input type="checkbox" />
          </Item>
          <span className="agree-text">Registration means you agree to the <a href='#'>User Agreement</a></span>
        </div>
        <div className='byte-form-submit-area'>
          <Button type="submit" btnType='primary'>Login</Button>
        </div>
      </Form>
    )
  },
  name: 'Registration Form with Various FormItem Components'
}
export const CFullForm: Story = {
  render: (args) => {
    const ref = useRef<IFormRef>(null)
    const resetAll = () => {
      console.log('form ref', ref.current)
      console.log('get value', ref.current?.getFieldValue('username'))
      ref.current?.resetFields()
    }
    return (
      <Form initialValues={{ username: 'viking', agreement: false }} {...args} ref={ref}>
        {({ isValid, isSubmitting }) => (
          <>
            <Item label='Username' name='username' rules={[{ type: 'email', required: true }]}>
              <Input />
            </Item>
            <Item label='Password' name='password' rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
              <Input type='password' />
            </Item>
            <Item label='Confirm Password' name='confirmPwd' rules={confirmRules}>
              <Input type='password' />
            </Item>
            <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center' }}>
              <Item
                name='agreement'
                valuePropName='checked'
                getValueFromEvent={(e) => e.target.checked}
                rules={[{ type: 'enum', enum: [true], message: 'Please agree to the terms' }]}
              >
                <input type="checkbox" />
              </Item>
              <span className="agree-text">Registration means you agree to the <a href='#'>User Agreement</a></span>
            </div>
            <div className='viking-form-submit-area'>
              <Button type="submit" btnType='primary'>Login {isSubmitting ? 'Validating' : 'Validated'} {isValid ? 'Passed😄' : 'Failed😢'} </Button>
              <Button type="button" onClick={resetAll}>Reset</Button>
            </div>
          </>
        )}
      </Form>
    )
  },
  name: 'Custom Rules with Form Instance'
}