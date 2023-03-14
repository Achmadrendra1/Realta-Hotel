import { doPagaCreate } from "@/Redux/Action/Payment/paymentDashAction";
import Buttons from "@/components/Button";
import { Form, Input, Modal } from "antd";
import { useDispatch } from "react-redux";

export default function AddFintech(props: any) {
  const dispatch = useDispatch();
  const {handleClose} = props

  const onFinish = (data: any) => {
    // console.log("Success:", data);
    dispatch(doPagaCreate(data));
    handleClose(false)
  };
  
  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Modal
        title="Add New Fintech"
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
            label="Fintech Code"
            name={"pagaCode"}
            rules={[{ required: true, message: "Please input code!" }]}
          >
            <Input placeholder="Input Code" />
          </Form.Item>
          <Form.Item
            label="Fintech Name"
            name={"pagaName"}
            rules={[{ required: true, message: "Please input fintech name!" }]}
          >
            <Input placeholder="Input FIntech Name" />
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
