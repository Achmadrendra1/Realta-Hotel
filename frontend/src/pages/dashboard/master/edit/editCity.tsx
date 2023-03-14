import { doUpdateAddress } from '@/Redux/Action/Master/actionAddress';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function EditAddress(props: any) {
  const dispatch = useDispatch();
  const idCity = props.idCity;
  const provNamee = props.provNamee;
  const dataCity = props.dataCity;
  const { handleClose } = props;
  const details = dataCity.find((item: any) => item.addr_id == idCity);
  const [formValues, setFormValues] = useState(details);

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };
  const onFinish = () => {
    dispatch(doUpdateAddress(formValues));
    handleClose(false);
    window.location.reload();
  };

  const onFinishFailed = (errorInfo: any) => {
  };

  return (
    <>
      <Modal
        title="Edit Data Address"
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
            label={`Provinces Name : ${provNamee}`}
            // rules={[{ required: true, message: 'Please input prov_name !' }]}
          ></Form.Item>
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Jalan"
            name="addr_line1"
            rules={[{ required: true, message: 'Please input jalan name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input Jalan Name"
              onChange={handleInputChange('addr_line1')}
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: '5%' }}
            label="City"
            name="addr_line2"
            rules={[{ required: true, message: 'Please input city name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input City Name"
              onChange={handleInputChange('addr_line2')}
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
