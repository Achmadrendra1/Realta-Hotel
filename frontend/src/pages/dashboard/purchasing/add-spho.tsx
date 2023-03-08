import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Modal, Upload, UploadFile, message, } from 'antd';
import Buttons from '@/components/Button';
import { EditStock } from '@/Redux/Action/Purchasing/purchasingAction';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadProps } from 'antd/es/upload';

export default function AddSphos(props: any) {
    const id = props.id
    const data = props.data
    const { handleClose } = props
    const dispatch = useDispatch()

    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [uploading, setUploading] = useState(false)

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

    const handleUpload = () => {
        const formData = new FormData()
        fileList.forEach((file) => {
            formData.append('files[]', file as RcFile)
        })
        setUploading(true)
        // You can use any AJAX library you like
        fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('Upload successfully')
            })
            .catch(() => {
                message.error('Upload failed')
            })
            .finally(() => {
                setUploading(false)
            })
    }

    const propsUpload: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file)
            const newFileList = fileList.slice()
            newFileList.splice(index, 1)
            setFileList(newFileList)
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file])

            return false
        },
        fileList
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
                        <Upload {...propsUpload}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label=" " colon={false}>
                        <div className="flex justify-end">
                            <Buttons type={"danger"} funcs={props.clickCancel}>
                                Cancel
                            </Buttons>
                            <div className="ml-2">
                                <Button
                                    type="primary"
                                    onClick={handleUpload}
                                    disabled={fileList.length === 0}
                                    loading={uploading}
                                    style={{ marginTop: 16 }}
                                >
                                    {uploading ? 'Uploading' : 'Start Upload'}
                                </Button>
                            </div>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}