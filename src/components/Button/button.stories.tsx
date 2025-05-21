import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Button from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component for user interactions. Supports different sizes and types.'
      }
    }
  },
  argTypes: {
    btnType: {
      description: 'Type of the button',
      control: 'select',
      options: ['primary', 'default', 'danger', 'link'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' }
      }
    },
    size: {
      description: 'Size of the button',
      control: 'select',
      options: ['lg', 'sm', undefined],
      table: {
        type: { summary: 'string' }
      }
    },
    disabled: {
      description: 'Whether the button is disabled',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    href: {
      description: 'Link address for link button',
      control: 'text',
      if: { arg: 'btnType', eq: 'link' },
      table: {
        type: { summary: 'string' }
      }
    },
    className: {
      description: 'Additional class name for custom styling',
      control: 'text',
      table: {
        type: { summary: 'string' }
      }
    },
    children: {
      description: 'Content of the button',
      control: 'text',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    onClick: {
      description: 'Callback when button is clicked',
      action: 'clicked',
      table: {
        type: { summary: 'function' }
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
}
export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
}

export const Primary: Story = {
  args: {
    btnType: 'primary',
    children: 'Primary Button',
  },
}

export const Danger: Story = {
  args: {
    btnType: 'danger',
    children: 'Danger Button',
  },
}

export const Link: Story = {
  args: {
    btnType: 'link',
    children: 'Link Button',
    href: 'https://google.com',
  },
}

export const ButtonWithSize: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button size="lg">Large button</Button>
      <Button size="sm">Small button</Button>
    </div>
  ),
}

export const ButtonWithType: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button btnType="primary">Primary button</Button>
      <Button btnType="danger">Danger button</Button>
      <Button btnType="link" href="https://google.com">Link button</Button>
    </div>
  ),
}