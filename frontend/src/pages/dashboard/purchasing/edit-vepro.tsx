import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Modal } from 'antd';
import Buttons from '@/components/Button';
import { EditVepro } from '@/Redux/Action/Purchasing/purchasingAction';

export default function EditVepros(props: any) {
    const id = props.id
    const data = props.data
    const { handleClose } = props
    const dispatch = useDispatch()

    const editVepros = data.find((item: any) => item.veproId == id)
    const [dataVepro, setDataVepro] = useState(editVepros)

    const eventHandler = (item: any) => (event: any) => {
        setDataVepro({ ...dataVepro, [item]: event.target.value });
    }

    const onFinish = () => {
        dispatch(EditVepro(dataVepro));
        handleClose(false)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    }

    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }]
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
                        name="veproStock" label='Stock Name'
                        rules={[{ required: true, message: 'Please input stock name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="veproQtyStocked" label='Qty Stocked'
                        rules={[{ required: true, message: 'Please input qty Stocked!' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        name="veproQtyRemaining" label='Remaining'
                        rules={[{ required: true, message: 'Please input remaining!' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        name="veproPrice" label='Sell Price'
                        rules={[{ required: true, message: 'Please input price!' }]}
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
