import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import Tabs from './tabs'
import TabItem from './tabItem'
import Icon from '../Icon'
const meta = {
  title: 'Components/Tabs',
  id: 'Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  subcomponents: { 'TabItem': TabItem },
  argTypes: {
    defaultIndex: { description: 'Initial active tab index', type: 'number' },
    className: { description: 'Additional CSS class for styling', type: 'string' },
    onSelect: { description: 'Callback when tab is selected', type: 'function' },
    type: { description: 'Tab style type', options: ['line', 'card'], control: { type: 'radio' } }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const ADefaultTabs = {
  render: (args) => (
    <Tabs {...args}>
      <TabItem label="Tab 1">this is content one</TabItem>
      <TabItem label="Tab 2">this is content two</TabItem>
      <TabItem label="User Management">this is content three</TabItem>
    </Tabs>
  )
} satisfies Story
export const BCardTabs = {
  args: {
    type: 'card'
  },
  render: (args) => (
    <Tabs {...args}>
      <TabItem label='card1'>this is card one</TabItem>
      <TabItem label="card2">this is content two</TabItem>
      <TabItem label="disabled" disabled>this is content three</TabItem>
    </Tabs>
  )
} satisfies Story
export const CCustomTabs = {
  args: {
    type: 'card'
  },
  render: (args) => (
    <Tabs {...args}>
      <TabItem label={<><Icon icon="check-circle" />  Custom Icon</>}>this is card one</TabItem>
      <TabItem label="tab2">this is content two</TabItem>
    </Tabs>
  )
} satisfies Story
