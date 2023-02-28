import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Modal, Upload, } from 'antd';
import Buttons from '@/components/Button';
import { EditStock } from '@/Redux/Action/Purchasing/purchasingAction';

export default function AddSphos(props: any) {
    const id = props.id
    const data = props.data
    const { handleClose } = props
    const dispatch = useDispatch()

    // const { sphos } = useSelector((state: any) => state.SphoReducer)

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
                title="Upload Photos Stock"
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
                    <Form.Item
                        name="stockName" label='Stock Name'
                        rules={[{ required: true, message: 'Please input stock name!' }]}
                    >
                        {/* <Upload
                            listType='picture-card'
                            onPreview={handlePreview}
                            onChange={handleChange} >

                            {fileList.length >= 4 ? null : uploadButton}

                        </Upload> */}
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