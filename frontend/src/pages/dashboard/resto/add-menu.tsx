import Dashboard from '@/layouts/dashboard'
import { Form, Input, Select } from 'antd'
import Link from 'next/link'
import React from 'react'

export default function menu() {
  const onFinish = (e:any) => {
    console.log(e)
  }
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
        Add Menu Resto
      </p>
        <Form.Item  name="remeFaciId" label="Facility" 
                    rules={[{ required: true, message: 'Please select restaurant!!' }]}>
          <Select placeholder='Select Restaurant'>
            <Select.Option value='1'>1</Select.Option>
            <Select.Option value='2'>2</Select.Option>
            <Select.Option value='3'>3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="remeName" label='Name Menu'
          rules={[{ required: true, message: 'Please input name menu!'}]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="remeDescription" label='Description'
          rules={[{ required: true, message: 'Please input description!'}]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        
        <Form.Item
          name="remePrice" label='Price'
          rules={[{ required: true, message: 'Please input price!'}]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="remeStatus" label='Status'
          rules={[{ required: true, message: 'Please select status!'}]}
        >
          <Select placeholder='Select Restaurant'>
            <Select.Option value='AVAILABLE'>AVAILABLE</Select.Option>
            <Select.Option value='EMPTY'>EMPTY</Select.Option>
          </Select>
        </Form.Item>

        <div className='flex justify-center'>
          <Link href=''>
            <div className='bg-slate-600 hover:bg-slate-500 text-white rounded-lg py-2 w-40 text-center'>
                Add New Menu
            </div>
          </Link>
        </div>
      </Form>
    </Dashboard>
  )
}
