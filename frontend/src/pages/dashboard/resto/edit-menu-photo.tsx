import Dashboard from '@/layouts/dashboard'
import { InboxOutlined } from '@ant-design/icons'
import { Form, Input, Select, Upload } from 'antd'
import Link from 'next/link'
import React from 'react'

export default function editPhoto() {
  const onFinish = (e:any) => {
    console.log(e)
  }

  
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Dashboard>
      <Form 
        onFinish={onFinish}
        labelCol={{ span:8 }}  
        wrapperCol={{ span:14 }}
        layout="horizontal"
        style={{ maxWidth: 600}}
        className="py-5 border shadow rounded-lg mx-auto"
      >
      <p className='text-center text-xl py-5 font-bold'>
        Update Menu Photo Resto
      </p>
        
        <Form.Item
          name="rempThumbnailFilename" label='Thumbnail Name'
          rules={[{ required: true, message: 'Please input thumbnail name!'}]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="rempPhotoFilename" label='Filename Photo'
          rules={[{ required: true, message: 'Please input filename photo!'}]}
        >
          <Input />
        </Form.Item>

        <Form.Item  name="rempPrimary" label="Primary" 
                    rules={[{ required: true, message: 'Please select primary type!!' }]}>
          <Select placeholder='Select Restaurant'>
            <Select.Option value='0'>Not Primary</Select.Option>
            <Select.Option value='1'>Primary</Select.Option>
          </Select>
        </Form.Item>

        
        <Form.Item label="Add Photo">
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} required noStyle >
                <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag 1 picture here</p>
                <p className="ant-upload-hint">Support for a single upload</p>
                </Upload.Dragger>
            </Form.Item>
        </Form.Item>
         

        <div className='flex justify-center'>
          <Link href=''>
            <div className='bg-slate-600 hover:bg-slate-500 text-white rounded-lg py-2 w-40 text-center'>
                Add Menu Photo
            </div>
          </Link>
        </div>
      </Form>
    </Dashboard>
  )
}
