import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Modal, } from 'antd';
import Buttons from '@/components/Button';
import { EditStock } from '@/Redux/Action/Purchasing/purchasingAction';

export default function EditStocks(props: any) {
    const id = props.id
    const data = props.data
    const { handleClose } = props
    const dispatch = useDispatch()

    const editStocks = data.find((item: any) => item.stockId == id)
    const [dataStock, setDataStock] = useState(editStocks)

    const eventHandler = (item: any) => (event: any) => {
        setDataStock({ ...dataStock, [item]: event.target.value })
    }

    const onFinish = () => {
        dispatch(EditStock(dataStock))
        handleClose(false)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo)
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
                    initialValues={dataStock}
                >
                    <p className='text-center text-xl py-5 font-bold'>
                        Edit Stock {editStocks.stockName}
                    </p>

                    <Form.Item
                        name="stockName" label='Stock Name'
                        rules={[{ required: true, message: 'Please input stock name!' }]}
                    >
                        <Input onChange={eventHandler("stockName")}/>
                    </Form.Item>

                    <Form.Item
                        name="stockQuantity" label='Quantity'
                        rules={[{ required: true, message: 'Please input quantity!' }]}
                    >
                        <Input onChange={eventHandler("stockQuantity")}/>
                    </Form.Item>

                    <Form.Item
                        name="stockReorderPoint" label='Reorder Point'
                        rules={[{ required: true, message: 'Please input reorder point!' }]}
                    >
                        <Input onChange={eventHandler("stockReorderPoint")}/>
                    </Form.Item>

                    <Form.Item
                        name="stockUsed" label='Used'
                        rules={[{ required: true, message: 'Please input used!' }]}
                    >
                        <Input onChange={eventHandler("stockUsed")}/>
                    </Form.Item>

                    <Form.Item
                        name="stockScrap" label='Scrap'
                        rules={[{ required: true, message: 'Please input scrap!' }]}
                    >
                        <Input onChange={eventHandler("stockScrap")}/>
                    </Form.Item>

                    <Form.Item
                        name="stockSize" label='Size'
                        rules={[{ required: true, message: 'Please input size!' }]}
                    >
                        <Input onChange={eventHandler("stockSize")}/>
                    </Form.Item>

                    <Form.Item
                        name="stockColor" label='Color'
                        rules={[{ required: true, message: 'Please input color!' }]}
                    >
                        <Input onChange={eventHandler("stockColor")}/>
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