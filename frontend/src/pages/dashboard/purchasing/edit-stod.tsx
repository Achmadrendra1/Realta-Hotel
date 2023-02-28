import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Modal, Select } from 'antd';
import Buttons from '@/components/Button';
import { EditStod } from '@/Redux/Action/Purchasing/purchasingAction';

export default function EditStods(props: any) {
    const id = props.id
    const data = props.data
    const { handleClose } = props
    const dispatch = useDispatch()

    const editStods = data.find((item: any) => item.stodId == id)
    const [dataStod, setDataStod] = useState(editStods)

    const eventHandler = (item: any) => (event: any) => {
        setDataStod({ ...dataStod, [item]: event.target.value })
    }

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
                    <Form.Item name="stodStatus" label="Status"
                        rules={[{ required: true, message: 'Please select status!' }]}>
                        <Select >
                            <Select.Option value='2'>0 (No Priority)</Select.Option>
                            <Select.Option value='1'>1 (Priority)</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="stodFaci" label="Used In"
                        rules={[{ required: true, message: 'Please select facilities!' }]}>
                        <Select />
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