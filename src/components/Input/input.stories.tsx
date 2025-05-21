import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'
const meta = {
  title: 'Components/Input',
  id: 'Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>


export const ADefault: Story = {
  args: {
    placeholder: 'Beautiful Input'
  },
  name: 'Default Input'
}

export const BDisabled: Story = {
  args: {
    placeholder: 'disabled input',
    disabled: true
  },
  name: 'Disabled Input'
}

export const CIcon: Story = {
  args: {
    placeholder: 'input with icon',
    icon: 'search'
  },
  name: 'Input with Icon'
}

export const DSizeInput: Story = {
  render: () => (
    <>
      <Input
        defaultValue="large size"
        size="lg"
      />
      <Input
        placeholder="small size"
        size="sm"
      />
    </>
  ),
  name: 'Different Size Inputs'
}

export const EPandInput: Story = {
  render: () => (
    <>
      <Input
        defaultValue="prepend text"
        prepend="https://"
      />
      <Input
        defaultValue="google"
        append=".com"
      />
    </>
  ),
  name: 'Input with Prefix and Suffix'
}

