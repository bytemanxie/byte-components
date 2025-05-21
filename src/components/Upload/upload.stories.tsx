import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Upload, UploadProps } from './upload'
import Button from '../Button/button'
import Icon from '../Icon/icon'

const meta = { 
  title: 'Components/Upload',
  id: 'Upload',
  component: Upload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    action: { description: 'Upload URL endpoint' },
    name: { description: 'Name of the file parameter sent to the backend' },
    headers: { description: 'Additional headers to send with the request' },
    data: { description: 'Additional data to send with the request' },
    withCredentials: { description: 'Whether to send cookies with the request' },
    accept: { description: 'File types that can be accepted' },
    multiple: { description: 'Whether to support multiple file upload' },
    drag: { description: 'Whether to enable drag and drop' },
    beforeUpload: { description: 'Function to check file before upload' },
    onChange: { description: 'Callback when uploading state changes' },
    onProgress: { description: 'Callback when progress changes' },
    onSuccess: { description: 'Callback when upload succeeds' },
    onError: { description: 'Callback when upload fails' },
    onRemove: { description: 'Callback when file is removed' }
  }
} satisfies Meta<typeof Upload>

export default meta

type Story = StoryObj<typeof meta>

export const SimpleUpload: Story = {
  args: {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76"
  },
  render: (args) => (
  <Upload
    {...args}
  >
    <Button size="lg" btnType="primary"><Icon icon="upload" /> Click to Upload </Button>
  </Upload>  
  )
}
export const CheckSizeBeforeUpload: Story = {
  args: {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76"
  },
  render: (args) => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file too big')
      return false;
    }
    return true;
  }
  return (
    <Upload
      {...args}
      beforeUpload={checkFileSize}
    >
      <Button size="lg" btnType="primary"><Icon icon="upload" /> Cannot upload files larger than 50Kb! </Button>
    </Upload>  
  )
  }
}
export const DragAndDropUpload: Story = {
  args: {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    name: "fileName",
    multiple: true,
    drag: true
  },
  render: (args) => (
  <Upload
    {...args}
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br/>
    <p>Click or drag files to this area to upload</p>
  </Upload>
  )
}