import { Button, Form, Input, Modal } from "antd";

export default function EditBank(props: any) {
    const id = props.id
  return (
    <>
      <Modal
        title="Edit Data Bank"
        open={props.show}
        onOk={props.clickOk}
        onCancel={props.clickCancel}
        centered
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Bank Code">
            <Input placeholder="Input Bank Code" type="number" />
          </Form.Item>
          <Form.Item label="Bank Name">
            <Input placeholder="Input Bank Name" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="bg-blue-700 text-white">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
