import { doAddProvinces } from '@/Redux/Action/Master/actionProvinces';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AddProvinces(props: any) {
  const dispatch = useDispatch();
  const cityNamee = props.cityNamee;
  const cityId = props.cityId;
  const dataProvinces = props.dataProvinces;
  const { handleClose } = props;
  const details = dataProvinces.find(
    (item: any) => item.addr_line2 == cityNamee
  );
  const [formValues, setFormValues] = useState(details);
  // console.log('Jalan :', cityNamee);
  // console.log('cityId :', cityId);
  // console.log('Data Jalan :', dataProvinces);
  // console.log('Detail Jalan :', details);

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };

  // console.log('handleInputChange :', handleInputChange);

  const onFinish = (event: any) => {
    // console.log('Success:', details);
    dispatch(doAddProvinces(details));
    handleClose(false);
    alert;
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
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
        title="Add New Jalan"
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
          initialValues={formValues}
        >
          <p>
            <Divider style={{ borderWidth: '2px' }} />
          </p>
          <Form.Item
            style={{ marginTop: '5%' }}
            label={`${cityNamee}`}
            name={'addr_line2'}
            rules={[
              { required: true, message: 'Please input Provinces name!' },
            ]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input City Name"
              onChange={handleInputChange('addr_line2')}
              disabled
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Jalan Name"
            rules={[{ required: true, message: 'Please input Jalan name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input Jalan Name"
              // onChange={handleInputChange('Provinces_name')}
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
