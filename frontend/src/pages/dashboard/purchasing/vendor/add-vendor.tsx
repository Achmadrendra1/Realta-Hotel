import React from 'react';
import { useDispatch } from 'react-redux';
import { DatePicker, DatePickerProps, Form, Input, Modal, Select } from 'antd';
import Buttons from '@/components/Button';
import { AddVendor } from '@/Redux/Action/Purchasing/purchasingAction';

export default function AddVendors(props: any) {
    const { handleClose } = props
    const dispatch = useDispatch()

    const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(dateString)
    }

    const dateFormat = "YYYY/MM/DD"
    const customFormat: DatePickerProps["format"] = (value) =>
        `${value.format(dateFormat)}`

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

    const onFinish = (dataVendor: any) => {
        console.log(dataVendor);
        const data = {
            ...dataVendor,
            vendorRegisterDate: dataVendor["vendorRegisterDate"].format("YYYY-MM-DD")
        }
        dispatch(AddVendor(data))
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
                        Add Vendor
                    </p>

                    <Form.Item
                        name="vendorName" label='Vendor'
                        rules={[{ required: true, message: 'Please input vendor name!' }]}
                    >
                        <Input placeholder='Input name'/>
                    </Form.Item>

                    <Form.Item name="vendorActive" label="Status"
                        rules={[{ required: true, message: 'Please select status!' }]}>
                        <Select
                            placeholder='Select status'
                            options={active} />
                    </Form.Item>

                    <Form.Item name="vendorPriority" label="Priority"
                        rules={[{ required: true, message: 'Please select priority!' }]}>
                        <Select
                            placeholder='Select priority'
                            options={priority} />
                    </Form.Item>

                    <Form.Item
                        name="vendorRegisterDate" label="Register Date"
                        rules={[{ required: true, message: 'Please input register date!' }]}
                    >
                        <DatePicker onChange={onChangeDate} format={customFormat} />
                    </Form.Item>

                    <Form.Item
                        name="vendorWeburl" label='Site'
                        rules={[{ required: true, message: 'Please input web site!' }]}
                    >
                        <Input placeholder='Input web url'/>
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
