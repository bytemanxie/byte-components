import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Alert from './alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultAlert: Story = {
  args: {
    title: 'This is alert!'
  }
}

export const AlertWithDescription: Story = {
  args: {
    title: 'Alert Title',
    description: 'This is a long description'
  }
}

export const AlertStyles: Story = {
  args: { title: 'Alert Styles Example' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Alert title="This is Success" type="success"></Alert>
      <Alert title="This is Danger!" type="danger"></Alert>
      <Alert title="This is Warning!" type="warning" closable={false}></Alert>
    </div>
  )
}