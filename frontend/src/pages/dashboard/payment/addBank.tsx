import { doAddBank } from "@/Redux/Action/Payment/paymentDashAction";
import Buttons from "@/components/Button";
import {  Form, Input, Modal } from "antd";
import { useDispatch } from "react-redux";

export default function AddBank(props: any) {
  const dispatch = useDispatch();
  const {handleClose} = props

  const onFinish = (data: any) => {
    // console.log("Success:", data);
    dispatch(doAddBank(data));
    handleClose(false)
  };
  
  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Modal
        title="Add New Bank"
        open={props.show}
        onOk={props.clickOk}
        onCancel={props.clickCancel}
        centered
        footer={null}
      >
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
            <Input placeholder="Input Bank Code" />
          </Form.Item>
          <Form.Item
            label="Bank Name"
            name={"bankName"}
            rules={[{ required: true, message: "Please input bank name!" }]}
          >
            <Input placeholder="Input Bank Name" />
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
  );
}
