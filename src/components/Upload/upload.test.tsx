import '@testing-library/jest-dom'
import React from 'react'
import axios from 'axios'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { Upload, UploadProps } from './upload'

// Mock the Icon component
vi.mock('../Icon/icon', () => ({
  default: (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
}))

// Mock axios
vi.mock('axios')
const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>
}

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: vi.fn(),
  onChange: vi.fn(),
  onRemove: vi.fn(),
  drag: true
}
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', {type: 'image/png'})
describe('Upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector('.byte-file-input') as HTMLInputElement
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
  })
  it('should handle upload process correctly', async () => {
    const { queryByText, getByText } = wrapper
    // Alternative implementation:
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })
    mockedAxios.post = vi.fn().mockResolvedValue({'data': 'cool'})
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile ]}})
    expect(queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
      expect(queryByText('check-circle')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png'
    }))
    expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png'
    }))

    //remove the uploaded file
    expect(queryByText('times')).toBeInTheDocument()
    fireEvent.click(getByText('times'))
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png'
    }))
  })
  it('should handle drag and drop files correctly', async () => {
    mockedAxios.post = vi.fn().mockResolvedValue({'data': 'cool'})
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    // const mockDropEvent = createEvent.drop(uploadArea)
    // Object.defineProperty(mockDropEvent, "dataTransfer", {
    //   value: {
    //     files: [testFile]
    //   }
    // })
    // fireEvent(uploadArea, mockDropEvent)
    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [testFile]
      }
    })
    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
      // expect(wrapper.queryByText('check-circle')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png'
    }))
  })
})