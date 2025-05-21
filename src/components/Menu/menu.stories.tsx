import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Menu from './index'

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // Add default args to ensure defaultOpenSubMenus is always defined
  args: {
    defaultOpenSubMenus: [],
  },
} satisfies Meta<typeof Menu>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultMenu: Story = {
  render: (args) => (
    <Menu defaultIndex='0' {...args}>
      <Menu.Item>
        cool link
      </Menu.Item>
      <Menu.Item>
        cool link 2
      </Menu.Item>
      <Menu.Item disabled>
        disabled
      </Menu.Item> 
      <Menu.SubMenu title="Dropdown Options">
        <Menu.Item>
          Dropdown option 1
        </Menu.Item>
        <Menu.Item>
          Dropdown option 2
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

export const VerticalMenu: Story = {
  render: (args) => (
    <Menu {...args} defaultIndex='0' mode="vertical">
      <Menu.Item>
        cool link
      </Menu.Item>
      <Menu.Item>
        cool link 2
      </Menu.Item>
      <Menu.SubMenu title="Click Dropdown Options">
        <Menu.Item>
          Dropdown option 1
        </Menu.Item>
        <Menu.Item>
          Dropdown option 2
        </Menu.Item>    
      </Menu.SubMenu>
    </Menu>
  )
}

export const OpenedMenu: Story = {
  args: {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus: ['2']
  },
  render: (args) => (
    <Menu {...args}>
      <Menu.Item>
        cool link
      </Menu.Item>
      <Menu.Item>
        cool link 2
      </Menu.Item>
      <Menu.SubMenu title="Default Opened Dropdown">
        <Menu.Item>
          Dropdown option 1
        </Menu.Item>
        <Menu.Item>
          Dropdown option 2
        </Menu.Item>    
      </Menu.SubMenu>
    </Menu>
  )
}