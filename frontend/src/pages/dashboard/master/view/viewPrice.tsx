import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { useState } from 'react';

export default function ViewPrice(props: any) {
  const idPrice = props.idPrice;
  const dataPrice = props.dataPrice;
  const { handleClose } = props;
  const detailsPrice = dataPrice.find((item: any) => item.pritId == idPrice);
  const [formValues, setFormValues] = useState(detailsPrice);

  const onFinish = () => {
    handleClose(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const closeDataPolicy = () => {
    console.log(idPrice);
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
            name={'pritDescription'}
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
