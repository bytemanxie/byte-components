import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Select from './index'

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Select component for selecting values from options.'
      }
    }
  },
  tags: ['autodocs'],
  id: 'Select',
  subcomponents: { 'Option': Select.Option },
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultSelect: Story = {
  render: (args) => (
    <Select
      {...args}
      placeholder="Please select"
    >
      <Select.Option value="option1" />
      <Select.Option value="option2" />
      <Select.Option value="option3" />
      <Select.Option value="disabled" disabled/>
      <Select.Option value="option5" />
    </Select>
  ),
  name: 'Default Select'
}
export const MultipleSelect: Story = {
  render: (args) => (
    <Select
      {...args}
      placeholder="Multiple selection supported!"
      multiple
    >
      <Select.Option value="option1" />
      <Select.Option value="option2" />
      <Select.Option value="option3" />
      <Select.Option value="byte" />
      <Select.Option value="byte2" />
    </Select>
  ),
  name: 'Multiple Select'
}
export const DisabledSelect: Story = {
  render: (args) => (
    <Select
      {...args}
      placeholder="Disabled!"
      disabled
    >
      <Select.Option value="option1" />
      <Select.Option value="option2" />
      <Select.Option value="option3" />
    </Select>  
  ),
  name: 'Disabled Select'
}