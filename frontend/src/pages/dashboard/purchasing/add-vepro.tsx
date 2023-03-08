import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Modal, Select } from 'antd';
import { AddVepro, AllStock } from '@/Redux/Action/Purchasing/purchasingAction';
import Buttons from '@/components/Button';

export default function AddVepros(props: any) {
    const { handleClose } = props
    const dispatch = useDispatch()

    const { stocks } = useSelector((state: any) => state.StockReducer)
    useEffect(() => {
        dispatch(AllStock())
    }, [])

    const onFinish = (dataVepro: any) => {
        dispatch(AddVepro(dataVepro))
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
                >
                    <p className='text-center text-xl py-5 font-bold'>
                        Add Vendor Product
                    </p>

                    <Form.Item name="vestock_vendor_id" initialValue={props.id} hidden />

                    <Form.Item
                        name="vestock_name" label='Stock Name'
                        rules={[{ required: true, message: 'Please input stock name!' }]}
                    >
                        <Select placeholder="Select stock">
                            {stocks && stocks.map((item: any) => (
                                <option value={item.stockId}>
                                    {item.stockName}
                                </option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="vestock_qty_stocked" label='Qty Stocked'
                        rules={[{ required: true, message: 'Please input qty Stocked!' }]}
                    >
                        <Input placeholder="Input quantity stocked" />
                    </Form.Item>

                    <Form.Item
                        name="vestock_qty_remaining" label='Remaining'
                        rules={[{ required: true, message: 'Please input remaining!' }]}
                    >
                        <Input placeholder="Input quantity remaining" />
                    </Form.Item>

                    <Form.Item
                        name="vestock_price" label='Sell Price'
                        rules={[{ required: true, message: 'Please input price!' }]}
                    >
                        <Input placeholder="Input price" />
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