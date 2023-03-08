import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { useState } from 'react';

export default function ViewPolicy(props: any) {
  const idPolicy = props.idPolicy;
  const dataPolicy = props.dataPolicy;
  const { handleClose } = props;
  const detailsPoli = dataPolicy.find((item: any) => item.poliId == idPolicy);
  const [formValues, setFormValues] = useState(detailsPoli);
  
  const onFinish = () => {
    handleClose(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const closeDataPolicy = () => {
    console.log(idPolicy);
  };
  return (
    <>
      <Modal
        title="Descriptions"
        open={props.show}
        onOk={props.clickOk}
        onCancel={props.clickCancel}
        style={{ top: 20, width: '200%' }}
        centered
        footer={null}
      >
        <Form
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={formValues}
        >
          <p>
            <Divider />
          </p>

          <Form.Item
            style={{ marginTop: '5%' }}
            label=""
            name={'poliDescription'}
          >
            <Input.TextArea readOnly={true} autoSize={{ minRows: 3 }} />
          </Form.Item>

          <Form.Item label=" " colon={false} style={{ textAlign: 'right' }}>
            <Button
              htmlType="submit"
              onClick={() => {
                props.clickCancel, closeDataPolicy;
              }}
            >
              <CheckCircleOutlined style={{ color: '#60c7db' }} />
              OK
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
