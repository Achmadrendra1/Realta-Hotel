import { doUpdateProvinces } from '@/Redux/Action/Master/actionProvinces';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function EditProvinces(props: any) {
  const dispatch = useDispatch();
  const idProvinces = props.idProvinces;
  const dataProvinces = props.dataProvinces;
  const { handleClose } = props;
  const details = dataProvinces.find(
    (item: any) => item.prov_id == idProvinces
  );
  const [formValues, setFormValues] = useState(details);

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };

  const onFinish = () => {
    dispatch(doUpdateProvinces(formValues));
    handleClose(false);
    window.location.reload();

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title="Edit Data Provinces"
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
          {/* <Form.Item
            label="Provinces Code"
            name="provincesCode"
            rules={[{ required: true, message: 'Please input Provinces code!' }]}
          >
            <Input
              disabled
              placeholder="Input Provinces Code"
              value={formValues.provincesCode}
              onChange={handleInputChange('provincesCode')}
            />
          </Form.Item> */}
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Provinces Name"
            name="prov_name"
            rules={[
              { required: true, message: 'Please input provinces name!' },
            ]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input Provinces Name"
              onChange={handleInputChange('prov_name')}
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
