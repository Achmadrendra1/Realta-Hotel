import { Form, Input, Modal } from 'antd'
import React from 'react'

export default function EditBooking(props:any) {
  
  
  return (
    <>
        <Modal
            title='Edit Data Booking'
            open={props.showBooking}
            onOk={props.clickOkBooking}
            onCancel={props.clickCancelBooking}
            centered
        >
            <Form layout='vertical'>
                <Form.Item label=''>
                    <Input type='text'/>
                </Form.Item>
            </Form>
        </Modal>
    </>  
  )
}
