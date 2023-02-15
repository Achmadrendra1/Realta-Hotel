import Dashboard from '@/layouts/dashboard'
import { Form, Input, InputNumber, Select } from 'antd'
import Link from 'next/link'
import React from 'react'

export default function editOrder() {
  const onFinish = (e:any) => {
    console.log(e)
  }
  return (
    <Dashboard>
      <>
      <Form 
        onFinish={onFinish}
        labelCol={{ span:8 }}  
        wrapperCol={{ span:14 }}
        layout="horizontal"
        style={{ maxWidth: 600}}
        className="py-2 border shadow rounded-lg mx-auto"
      >
      <p className='text-center text-xl py-5 font-bold'>
        Update Order Menu Resto
      </p>
        <Form.Item
          name="ormeUserId" label='ID User'
        >
          <Input disabled />
        </Form.Item>
        
        <Form.Item
          name="ormeOrderNumber" label='Order Number'
        >
          <Input disabled />
        </Form.Item>

        
        <Form.Item
          name="ormeTotalItem" label='Total Item'
          rules={[{ required: true, message: 'Please input total item!'}]}
        >
          <InputNumber />
        </Form.Item>
        
        <Form.Item
          name="ormeTotalDiscount" label='Total Discount'
          rules={[{ required: true, message: 'Please input total discount!'}]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ormeTotalAmount" label='Total Amount'
          rules={[{ required: true, message: 'Please input total amount!'}]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ormePayType" label='Pay Type'
          rules={[{ required: true, message: 'Please select pay type!'}]}
        >
          <Select placeholder='Select Pay Type'>
            <Select.Option value='CC'>CREDIT CARD</Select.Option>
            <Select.Option value='C'>CASH</Select.Option>
            <Select.Option value='D'>DEBET</Select.Option>
            <Select.Option value='PG'>PAYMENT GATEWAY</Select.Option>
            <Select.Option value='BO'>BILL CHECKOUT</Select.Option>
            
          </Select>
        </Form.Item>

        <Form.Item
          name="ormeCardnumber" label='Card number'
          rules={[{ required: true, message: 'Please input card number!'}]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ormeIsPaid" label='Paid Status'
          rules={[{ required: true, message: 'Please select paid status!'}]}
        >
          <Select placeholder='Select Paid Status'>
            <Select.Option value='P'>Paid</Select.Option>
            <Select.Option value='B'>Bill</Select.Option> 
          </Select>
        </Form.Item>

        <div className='flex justify-center'>
          <Link href=''>
            <div className='bg-slate-600 hover:bg-slate-500 text-white rounded-lg py-2 w-40 text-center'>
                Update Order Menu
            </div>
          </Link>
        </div>
      </Form>
      </>

    </Dashboard>
  )
}
