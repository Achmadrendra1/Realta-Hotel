import { doPagaUpdate } from "@/Redux/Action/Payment/paymentDashAction";
import Buttons from "@/components/Button";
import { Form, Input, Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function EditFintech(props: any) {
  const dispatch = useDispatch();
  const id = props.id;
  const data = props.data;
  const {handleClose} = props
  const details = data.find((item: any) => item.pagaEntityId == id);
  const [formValues, setFormValues] = useState(details);

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };

  const onFinish = () => {
    // console.log("Success:", formValues);
    dispatch(doPagaUpdate(formValues))
    handleClose(false)
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="Edit Data Fintech"
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
          initialValues={formValues}
        >
          <Form.Item label="Fintech Code" name='pagaCode' rules={[{ required: true, message: "Please input code!" }]}>
            <Input
              placeholder="Input Code"
              onChange={handleInputChange("pagaCode")}
              
            />
          </Form.Item>
          <Form.Item label="Fintech Name" name='pagaName' rules={[{ required: true, message: "Please input fintech name!" }]}>
            <Input
              placeholder="Input Fintech Name"
              onChange={handleInputChange("pagaName")}
            />
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
