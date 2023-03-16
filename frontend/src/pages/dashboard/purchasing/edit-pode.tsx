import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Modal } from 'antd';
import Buttons from '@/components/Button';
import { EditPode } from '@/Redux/Action/Purchasing/purchasingAction';

export default function EditPodes(props: any) {
    const id = props.id
    const data = props.data
    const { handleClose } = props
    const dispatch = useDispatch()

    const editPodes = data.find((item: any) => item.podhe_id == id)
    const [dataPode, setDataPode] = useState(editPodes)

    const eventHandler = (item: any) => (event: any) => {
        setDataPode({ ...dataPode, [item]: event.target.value })
    }

    const onFinish = () => {
        dispatch(EditPode(dataPode))
        handleClose(false)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo)
    }

    return (
        <>
            <Modal
                title='Edit Stock'
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
                    initialValues={dataPode}
                >
                    <Form.Item
                        name="podhe_stock_name" label='Stock'
                        rules={[{ required: true, message: 'Please input stock order!' }]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        name="podhe_order_qty" label='Order Qty'
                        rules={[{ required: true, message: 'Please input order quantity!' }]}
                    >
                        <Input onChange={eventHandler("podhe_order_qty")} />
                    </Form.Item>

                    <Form.Item
                        name="podhe_received_qty" label='Received'
                        rules={[{ required: true, message: 'Please input order received quantity!' }]}
                    >
                        <Input onChange={eventHandler("podhe_received_qty")} />
                    </Form.Item>

                    <Form.Item
                        name="podhe_rejected_qty" label='Rejected'
                        rules={[{ required: true, message: 'Please input order rejected quantity!' }]}
                    >
                        <Input onChange={eventHandler("podhe_rejected_qty")} />
                    </Form.Item>

                    {/* <Form.Item label=" " colon={false}>
                        <Button className="flex justify-end" disabled>Generate Barcode</Button>
                    </Form.Item> */}

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