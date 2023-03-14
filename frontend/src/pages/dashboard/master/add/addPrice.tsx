import { doAddPriceItems } from '@/Redux/Action/Master/actionPriceItems';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, InputNumber, Modal, Select } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AddPrice(props: any) {
  const dispatch = useDispatch();
  const { handleClose } = props;

  const onFinish = (data: any) => {
    dispatch(doAddPriceItems(data));
    handleClose(false);
    window.location.reload();
    alert;
  };

  const onFinishFailed = (errorInfo: any) => {};

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
        title="Add New Price"
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
            label="Items Name"
            name={'pritName'}
            rules={[{ required: true, message: 'Please input Items name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input Items Name"
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Price Type"
            name={'pritType'}
            rules={[{ required: true, message: 'Please input Price Type!' }]}
          >
            <Select
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '1%',
              }}
              placeholder="Select a Category Type"
            >
              <Select.Option value="type1">Facility</Select.Option>
              <Select.Option value="type2">Food</Select.Option>
              <Select.Option value="type2">Service</Select.Option>
              <Select.Option value="type2">Snack</Select.Option>
              <Select.Option value="type2">SoftDrink</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Items Price"
            name={'pritPrice'}
            rules={[{ required: true, message: 'Please input Items Price!' }]}
          >
            <Input
              type="number"
              min={0}
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="0.000"
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Descriptions"
            name={'pritDescription'}
            rules={[{ required: true, message: 'Please input Descriptions' }]}
          >
            <Input.TextArea
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '1%',
              }}
              placeholder="  Descriptions"
              autoSize={{ minRows: 5 }}
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
