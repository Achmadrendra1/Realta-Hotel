import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Modal, Select } from 'antd';
import Buttons from '@/components/Button';
import { EditStod } from '@/Redux/Action/Purchasing/purchasingAction';
import { getFacility } from '@/Redux/Action/Hotel/HotelAction';

export default function EditStods(props: any) {
    const id = props.id
    const data = props.data
    const { handleClose } = props
    const dispatch = useDispatch()

    const { facilities } = useSelector((state: any) => state.HotelReducer)
    useEffect(() => {
        dispatch(getFacility())
    }, [])

    const editStods = data.find((item: any) => item.stockdet_id == id)
    const [dataStod, setDataStod] = useState(editStods)

    const status = [
        {
            value: "1",
            label: "Stocked"
        },
        {
            value: "2",
            label: "Expired"
        },
        {
            value: "3",
            label: "Broken"
        },
        {
            value: "4",
            label: "Used"
        }
    ]

    const onFinish = () => {
        dispatch(EditStod(dataStod))
        handleClose(false)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo)
    }

    return (
        <>
            <Modal
                title='Switch Status'
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
                    initialValues={dataStod}
                >
                    <Form.Item
                        name="stockdet_status" label="Status"
                        rules={[{ required: true, message: 'Please select status!' }]}
                    >
                        <Select
                            options={status}
                            onChange={(value) => {
                                setDataStod({ ...dataStod, stockdet_status: value })
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="stockdet_facilities" label="Used In"
                        rules={[{ required: true, message: 'Please select facilities!' }]}
                    >
                        <Select
                            onChange={(value) => {
                                setDataStod({ ...dataStod, stockdet_facilities: value })
                            }}
                        >
                            {facilities && facilities.map((item: any) => (
                                <option value={item.faciId}>
                                    {item.faciName}
                                </option>
                            ))}
                        </Select>
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