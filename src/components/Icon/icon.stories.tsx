import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon, { IconProps } from './icon'
import Button from '../Button'

const meta = { 
  title: 'Components/Icon',
  id: 'Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof Icon>

export default meta

type Story = StoryFn<IconProps>
export const DefaultIcons = {
  name: "Default Icons",
  render: (args: IconProps) => (
    <>
      <Icon icon="check" size="3x"/>
      <Icon icon="times" size="3x"/>
      <Icon icon="anchor" size="3x"/>
      <Icon icon="trash" size="3x"/>
      <Button size="lg" btnType="primary"><Icon icon="check"/> check </Button>
    </>
  )
}
export const ThemedIcons = {
  name: "Themed Icons",
  render: (args: IconProps) => (
    <>
      <Icon icon="check" size="3x" theme="success"/>
      <Icon icon="times" size="3x" theme="danger"/>
      <Icon icon="anchor" size="3x" theme="primary"/>
      <Icon icon="exclamation-circle" size="3x" theme="warning" />
    </>
  )
}
export const AnimatedIcons = {
  name: "Animated Icons",
  render: (args: IconProps) => (
    <>
      <Icon icon="spinner" size="3x" theme="primary" spin/>
      <Icon icon="spinner" size="3x" theme="success" pulse/>
    </>
  )
}
