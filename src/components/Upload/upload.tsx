import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios, { AxiosProgressEvent } from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent: number;
  raw?: File;
  response?: any;
  error?: any;
}
export interface UploadProps {
  /**Required parameter, upload URL */
  action: string;
  /**List of uploaded files */
  defaultFileList?: UploadFile[];
  /**Hook before uploading files, parameter is the file to upload, if returns false or Promise, the upload will be stopped */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**Hook during file upload */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /**Hook when file upload succeeds */
  onSuccess?: (data: any, file: UploadFile) => void;
  /**Hook when file upload fails */
  onError?: (err: any, file: UploadFile) => void;
  /**Hook when file status changes, called when upload succeeds or fails */
  onChange?: (file: UploadFile) => void;
  /**Hook when removing a file from the file list */
  onRemove?: (file: UploadFile) => void;
  /**Set upload request headers */
  headers?: { [key: string]: any };
  /**Name of the file field for upload */
  name?: string;
  /**Additional parameters to include with upload */
  data?: { [key: string]: any };
  /**Support sending cookie credentials */
  withCredentials?: boolean;
  /**Optional parameter, accepted file types for upload */
  accept?: string;
  /**Whether to support multiple file selection */
  multiple?: boolean;
  /**Whether to support drag and drop upload */
  drag?: boolean;
  children?: React.ReactNode
}

/**
 * Upload files by clicking or dragging and dropping
 * ### Import
 * 
 * ```jsx
 * import { Upload } from 'byteship'
 * ```
 */
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name = 'file',
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  const uploadFiles = (files: FileList, test?: boolean) => {
    let postFiles = Array.from(files)
    if (test) {
      console.log('drag', postFiles[0])
    }
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e: AxiosProgressEvent) => {
        let percentage = Math.round((e.loaded * 100) / (e.total || e.loaded)) || 0;
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading' })
          _file.status = 'uploading'
          _file.percent = percentage
          if (onProgress) {
            onProgress(percentage, _file)
          }
        }
      }
    }).then(resp => {
      updateFileList(_file, { status: 'success', response: resp.data })
      _file.status = 'success'
      _file.response = resp.data
      if (onSuccess) {
        onSuccess(resp.data, _file)
      }
      if (onChange) {
        onChange(_file)
      }
    }).catch(err => {
      updateFileList(_file, { status: 'error', error: err })
      _file.status = 'error'
      _file.error = err
      if (onError) {
        onError(err, _file)
      }
      if (onChange) {
        onChange(_file)
      }
    })
  }

  return (
    <div
      className="byte-upload-component"
    >
      <div className="byte-upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}>
        {drag ?
          <Dragger onFile={(files) => { uploadFiles(files, true) }}>
            {children}
          </Dragger> :
          children
        }
        <input
          className="byte-file-input"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

// Using default parameters instead of defaultProps for better TypeScript support
export default Upload;