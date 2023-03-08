import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Modal, Select } from 'antd';
import Buttons from '@/components/Button';
import { EditPohe } from '@/Redux/Action/Purchasing/purchasingAction';

export default function EditPohes(props: any) {
    const id = props.id
    const data = props.data
    const { handleClose } = props
    const dispatch = useDispatch()

    const editPohes = data.find((item: any) => item.pove_id == id)
    const [dataPohe, setDataPohe] = useState(editPohes)

    const status = [
        {
            value: 1,
            label: "Pending"
        },
        {
            value: 2,
            label: "Approve"
        },
        {
            value: 3,
            label: "Rejected"
        },
        {
            value: 4,
            label: "Received"
        }
    ]

    const onFinish = () => {
        dispatch(EditPohe(dataPohe));
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
                    initialValues={dataPohe}
                >

                    <Form.Item name="pove_status" label="Status"
                        rules={[{ required: true, message: 'Please select status!' }]}
                    >
                        <Select
                            options={status}
                            onChange={(value) => {
                                setDataPohe({ ...dataPohe, poheStatus: value })
                            }} />
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