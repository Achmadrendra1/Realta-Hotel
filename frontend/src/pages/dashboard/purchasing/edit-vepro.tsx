import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Modal, Select } from 'antd';
import Buttons from '@/components/Button';
import { AllStock, EditVepro } from '@/Redux/Action/Purchasing/purchasingAction';

export default function EditVepros(props: any) {
    const id = props.id
    const data = props.data
    const { handleClose } = props
    const dispatch = useDispatch()

    const editVepros = data.find((item: any) => item.vestock_id == id)
    const [dataVepro, setDataVepro] = useState(editVepros)

    const eventHandler = (item: any) => (event: any) => {
        setDataVepro({ ...dataVepro, [item]: event.target.value })
    }

    const { stocks } = useSelector((state: any) => state.StockReducer)
    useEffect(() => {
        dispatch(AllStock())
    }, [])

    const onFinish = () => {
        dispatch(EditVepro(dataVepro))
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
                    initialValues={dataVepro}
                >
                    <p className='text-center text-xl py-5 font-bold'>
                        Edit Vendor Product
                    </p>

                    <Form.Item
                        name="vestock_name" label='Stock Name'
                        rules={[{ required: true, message: 'Please input stock name!' }]}
                    >
                        <Select
                            onChange={(value) => {
                                setDataVepro({ ...dataVepro, vestock_name: value })
                            }}
                        >
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
                        <Input onChange={eventHandler("vestock_qty_stocked")}/>
                    </Form.Item>

                    <Form.Item
                        name="vestock_qty_remaining" label='Remaining'
                        rules={[{ required: true, message: 'Please input remaining!' }]}
                    >
                        <Input onChange={eventHandler("vestock_qty_remaining")}/>
                    </Form.Item>

                    <Form.Item
                        name="vestock_price" label='Sell Price'
                        rules={[{ required: true, message: 'Please input price!' }]}
                    >
                        <Input onChange={eventHandler("vestock_price")}/>
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
            </Modal >
        </>
    )
}
