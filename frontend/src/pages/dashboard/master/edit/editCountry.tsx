import { doUpdateCountry } from '@/Redux/Action/Master/actionCountry';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function EditCountry(props: any) {
  const dispatch = useDispatch();
  const idCountry = props.idCountry;
  const dataCountry = props.dataCountry;
  const { handleClose } = props;
  const details = dataCountry.find((item: any) => item.country_id == idCountry);
  const [formValues, setFormValues] = useState(details);

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };

  const onFinish = () => {
    dispatch(doUpdateCountry(formValues));
    handleClose(false);
    window.location.reload();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title="Edit Data Country"
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
            label="Country Code"
            name="countryCode"
            rules={[{ required: true, message: 'Please input Country code!' }]}
          >
            <Input
              disabled
              placeholder="Input Country Code"
              value={formValues.countryCode}
              onChange={handleInputChange('countryCode')}
            />
          </Form.Item> */}
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Country Name"
            name="country_name"
            rules={[{ required: true, message: 'Please input country name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input Country Name"
              onChange={handleInputChange('country_name')}
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
