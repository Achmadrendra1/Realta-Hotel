import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Modal, } from 'antd';
import Buttons from '@/components/Button';
import { AddStock } from '@/Redux/Action/Purchasing/purchasingAction';

export default function AddStocks(props: any) {
    const { handleClose } = props
    const dispatch = useDispatch()

    const onFinish = (data: any) => {
        dispatch(AddStock(data))
        handleClose(false)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed", errorInfo)
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
                        Add Stock
                    </p>

                    <Form.Item
                        name="stockName" label='Stock Name'
                        rules={[{ required: true, message: 'Please input stock name!' }]}
                    >
                        <Input placeholder='Input name'/>
                    </Form.Item>

                    <Form.Item
                        name="stockQuantity" label='Quantity'
                        rules={[{ required: true, message: 'Please input quantity!' }]}
                    >
                        <Input placeholder='Input quantity'/>
                    </Form.Item>

                    <Form.Item
                        name="stockReorderPoint" label='Reorder Point'
                        rules={[{ required: true, message: 'Please input reorder point!' }]}
                    >
                        <Input placeholder='Input reorder point'/>
                    </Form.Item>

                    <Form.Item
                        name="stockUsed" label='Used'
                        rules={[{ required: true, message: 'Please input used!' }]}
                    >
                        <Input placeholder='Input quantity used'/>
                    </Form.Item>

                    <Form.Item
                        name="stockScrap" label='Scrap'
                        rules={[{ required: true, message: 'Please input scrap!' }]}
                    >
                        <Input placeholder='Input quantity scrap'/>
                    </Form.Item>

                    <Form.Item
                        name="stockSize" label='Size'
                        rules={[{ required: true, message: 'Please input size!' }]}
                    >
                        <Input placeholder='Input size'/>
                    </Form.Item>

                    <Form.Item
                        name="stockColor" label='Color'
                        rules={[{ required: true, message: 'Please input color!' }]}
                    >
                        <Input placeholder='Input color'/>
                    </Form.Item>

                    <Form.Item label=" " colon={false}>
                        <div className="flex justify-end">
                            <Buttons type={"danger"} funcs={props.clickCancel}>
                                Cancel
                            </Buttons>
                            <div className="ml-2">
                                <Buttons>Save</Buttons>
                            </div>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}