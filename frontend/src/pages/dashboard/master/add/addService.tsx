import { doAddServiceTask } from '@/Redux/Action/Master/actionServiceTask';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AddService(props: any) {
  const dispatch = useDispatch();
  const { handleClose } = props;

  const onFinish = (data: any) => {
    dispatch(doAddServiceTask(data));
    handleClose(false);
    alert;
  };

  const onFinishFailed = (errorInfo: any) => {
  };

  //Alert
  const [visible, setVisible] = useState('hidden');
  const alert = (e: any) => {
    window.location.reload();
    setVisible('');
    setTimeout(() => {
      setVisible('hidden');
    }, 777);
  };

  return (
    <>
      <Modal
        title="Add New Service"
        open={props.show}
        onOk={props.clickOk}
        // confirmLoading={confirmLoading}
        onCancel={props.clickCancel}
        style={{ top: 20 }}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <p>
            <Divider style={{ borderWidth: '2px' }} />
          </p>
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Service Name"
            name={'setaName'}
            rules={[{ required: true, message: 'Please input Service name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input Service Name"
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Sequence  Order"
            name={'setSeq'}
            rules={[
              { required: true, message: 'Please input Sequence Order!' },
            ]}
          >
            <Input
            type="number"
            min={0}
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
                
              }}
              placeholder="Input Sequence Order"
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
