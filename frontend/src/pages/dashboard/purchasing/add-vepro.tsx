import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Modal } from 'antd';
import { AddVepro } from '@/Redux/Action/Purchasing/purchasingAction';

export default function AddVepros(props: any) {
    const { handleClose } = props
    const dispatch = useDispatch()

    const onFinish = (dataVepro: any) => {
        dispatch(AddVepro(dataVepro))
        handleClose(false)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo)
    }

    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }]
    }

    return (
        <>
            <Modal
                open={props.show}
                onOk={props.clickOk}
                onCancel={props.clickCancel}
                footer={null}>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <p className='text-center text-xl py-5 font-bold'>
                        Add Vendor Product
                    </p>

                    <Form.Item
                        name="veproStock" label='Stock Name'
                        rules={[{ required: true, message: 'Please input stock name!' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        name="veproQtyStocked" label='Qty Stocked'
                        rules={[{ required: true, message: 'Please input qty Stocked!' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        name="veproQtyRemaining" label='Remaining'
                        rules={[{ required: true, message: 'Please input remaining!' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        name="veproPrice" label='Sell Price'
                        rules={[{ required: true, message: 'Please input price!' }]}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}
