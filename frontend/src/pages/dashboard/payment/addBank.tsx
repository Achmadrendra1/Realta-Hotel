import { doAddBank } from "@/Redux/Action/Payment/paymentDashAction";
import { Button, Form, Input, Modal, message } from "antd";
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";

export default function AddBank(props: any) {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState({
    bankCode : '',
    bankName : ''
  })
  const {handleClose} = props

  let eventHandler = (input: any) => (event: any) => {
    setData({ ...data, [input]: event.target.value });
  };

  let createBank = (e: any) => {
    e.preventDefault()
    dispatch(doAddBank(data))
    handleClose(false)
  }

  const error = useSelector((state:any) => state.payBankReducer.error)

  useEffect(() => {
    if (error !== null) {
      messageApi
        .open({
          type: "loading",
          content: "loading....",
          duration: 1,
        })
        .then(() => message.error(error, 2));
    }
  }, [error]);
  
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Modal
        title="Add New Bank"
        open={props.show}
        onOk={props.clickOk}
        // confirmLoading={confirmLoading}
        onCancel={props.clickCancel}
        centered
        footer={null}
      >
        {contextHolder}
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Bank Code"
            name={"bankCode"}
            rules={[{ required: true, message: "Please input bank code!" }]}
          >
            <Input placeholder="Input Bank Code" onChange={eventHandler('bankCode')}/>
          </Form.Item>
          <Form.Item
            label="Bank Name"
            name={"bankName"}
            rules={[{ required: true, message: "Please input bank name!" }]}
          >
            <Input placeholder="Input Bank Name" onChange={eventHandler('bankName')}/>
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button htmlType="submit" className="bg-blue-700 text-white" onClick={createBank}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
