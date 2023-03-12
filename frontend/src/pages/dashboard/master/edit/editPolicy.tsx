import { doUpdatePolicy } from '@/Redux/Action/Master/actionPolicy';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function EditPolicy(props: any) {
  const dispatch = useDispatch();
  const idPolicy = props.idPolicy;
  const dataPolicy = props.dataPolicy;
  const { handleClose } = props;
  const details = dataPolicy.find((item: any) => item.poliId == idPolicy);
  const [formValues, setFormValues] = useState(details);

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };

  const onFinish = () => {
    dispatch(doUpdatePolicy(formValues));
    handleClose(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title="Edit Data Policy"
        open={props.show}
        onOk={props.clickOk}
        onCancel={props.clickCancel}
        style={{ top: 20 }}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={formValues}
        >
          <p>
            <Divider style={{ borderWidth: '2px' }} />
          </p>

          <Form.Item
            style={{ marginTop: '5%' }}
            label="Policy Name"
            name="poliName" // get from database
            rules={[{ required: true, message: 'Please input Policy name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input Policy Name"
              onChange={handleInputChange('poliName')}
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Description"
            name={'poliDescription'}
            rules={[{ required: true, message: 'Please input Description !' }]}
          >
            <Input.TextArea
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input Description"
              onChange={handleInputChange('poliDescription')}
            />
          </Form.Item>

          <Form.Item label=" " colon={false} style={{ textAlign: 'right' }}>
            <Button htmlType="reset" onClick={props.clickCancel}>
              <UndoOutlined style={{ color: '#FF8002' }} />
              Cancel
            </Button>

            <Button
              htmlType="submit"
              style={{ marginLeft: '3%  ', marginRight: '1%' }}
            >
              <SaveOutlined style={{ color: '#3399FF' }} />
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
