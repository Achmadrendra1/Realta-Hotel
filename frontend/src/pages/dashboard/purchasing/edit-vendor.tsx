import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DatePicker, DatePickerProps, Form, Input, Modal, Select } from 'antd';
import Buttons from '@/components/Button';
import { EditVendor } from '@/Redux/Action/Purchasing/purchasingAction';

export default function EditVendors(props: any) {
    const id = props.id
    const data = props.data
    const { handleClose } = props
    const dispatch = useDispatch()

    const editVendors = data.find((item: any) => item.vendorId == id)
    const [dataVendor, setDataVendor] = useState(editVendors)

    const date = editVendors.vendorRegisterDate.split('T')[0]

    const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(dateString)
    }

    const dateFormat = "YYYY/MM/DD"
    const customFormat: DatePickerProps["format"] = (value: any) =>
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
            label: "Lowest"
        },
        {
            value: 1,
            label: "Highest"
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
                        <Input />
                    </Form.Item>

                    {/* <Form.Item
                        name="vendorRegisterDate" label="Register Date"
                        rules={[{ required: true, message: 'Please input register date!' }]}
                    >
                        <DatePicker onChange={onChangeDate} format={customFormat} />
                    </Form.Item> */}

                    <Form.Item name="vendorActive" label="Status"
                        rules={[{ required: true, message: 'Please select status!' }]}>
                        <Select options={active} />
                    </Form.Item>


                    <Form.Item name="vendorPriority" label="Priority"
                        rules={[{ required: true, message: 'Please select priority!' }]}>
                        <Select options={priority} />
                    </Form.Item>

                    <Form.Item
                        name="vendorWeburl" label='Site'
                        rules={[{ required: true, message: 'Please input web site!' }]}
                    >
                        <Input />
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