import { doAddLocationsRC } from '@/Redux/Action/Master/actionLocationsRC';
import {
  doAddProvinces,
  doUpdateProvinces,
} from '@/Redux/Action/Master/actionProvinces';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AddProvinces(props: any) {
  const dispatch = useDispatch();
  const countryNamee = props.countryNamee;
  const countryId = props.countryId;
  const dataProvinces = props.dataProvinces;
  const { handleClose } = props;
  const details = dataProvinces.find(
    (item: any) => item.prov_country_id == countryId
  );
  const [formValues, setFormValues] = useState(details);

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };

  const onFinish = (data: any) => {
    dispatch(doAddProvinces(data));
    dispatch(doUpdateProvinces(formValues));
    handleClose(false);
    window.location.reload();
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
        title="Add New Provinces"
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
            label={`${countryNamee}`}
            name={'prov_country_id'}
            rules={[{ required: true, message: 'Please input Country name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input Provinces Name"
              onChange={handleInputChange('prov_country_id')}
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Provinces Name"
            name={'prov_name'}
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
              placeholder="Input Provinces Name"
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
