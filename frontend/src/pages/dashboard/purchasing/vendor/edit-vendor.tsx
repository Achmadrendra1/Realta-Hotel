import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Modal, Select } from 'antd';
import Buttons from '@/components/Button';
import { EditVendor } from '@/Redux/Action/Purchasing/purchasingAction';

export default function EditVendors(props: any) {
    const id = props.id
    const data = props.data
    const { handleClose } = props
    const dispatch = useDispatch()

    const editVendors = data.find((item: any) => item.vendorId == id)
    const [dataVendor, setDataVendor] = useState(editVendors)

    const active = [
        {
            value: 0,
            label: "InActive"
        },
        {
            value: 1,
            label: "Active"
        }
    ]

    const priority = [
        {
            value: 0,
            label: "Non Priority"
        },
        {
            value: 1,
            label: "Priority"
        }
    ]

    const eventHandler = (item: any) => (event: any) => {
        setDataVendor({ ...dataVendor, [item]: event.target.value })
    }

    const onFinish = () => {
        dispatch(EditVendor(dataVendor))
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
                    initialValues={dataVendor}
                >
                    <p className='text-center text-xl py-5 font-bold'>
                        Edit Vendor {editVendors.vendorName}
                    </p>

                    <Form.Item
                        name="vendorName" label='Vendor'
                        rules={[{ required: true, message: 'Please input vendor name!' }]}
                    >
                        <Input onChange={eventHandler("vendorName")} />
                    </Form.Item>

                    <Form.Item
                        name="vendorRegisterDate" label="Register Date"
                        rules={[{ required: true, message: 'Please input register date!' }]}
                    >
                        <Input type='Date' onChange={eventHandler("vendorRegisterDate")} />
                    </Form.Item>

                    <Form.Item
                        name="vendorActive" label="Status"
                        rules={[{ required: true, message: 'Please select status!' }]}
                    >
                        <Select
                            options={active}
                            onChange={(value) => {
                                setDataVendor({ ...dataVendor, vendorActive: value })
                            }} />
                    </Form.Item>

                    <Form.Item
                        name="vendorPriority" label="Priority"
                        rules={[{ required: true, message: 'Please select priority!' }]}
                    >
                        <Select
                            options={priority}
                            onChange={(value) => {
                                setDataVendor({ ...dataVendor, vendorPriority: value })
                            }} />
                    </Form.Item>

                    <Form.Item
                        name="vendorWeburl" label='Site'
                        rules={[{ required: true, message: 'Please input web site!' }]}
                    >
                        <Input onChange={eventHandler("vendorWeburl")} />
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
