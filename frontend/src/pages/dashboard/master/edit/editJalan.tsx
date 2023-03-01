import { doUpdateAddress } from '@/Redux/Action/Master/actionAddress';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function EditAddress(props: any) {
  const dispatch = useDispatch();
  const idJalan = props.idJalan;
  const dataJalan = props.dataJalan;
  const { handleClose } = props;
  const details = dataJalan.find((item: any) => item.addr_id == idJalan);

  const [formValues, setFormValues] = useState(details);

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };
  const onFinish = () => {
    console.log('Success:', formValues);
    dispatch(doUpdateAddress(formValues));
    handleClose(false);
    window.location.reload();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
            label="City Name"
            name="addrLine2"
            // rules={[{ required: true, message: 'Please input prov_name !' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              disabled
              placeholder="Input Provinces Name"
              onChange={handleInputChange('prov_name')}
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Jalan"
            name="addrLine1"
            rules={[{ required: true, message: 'Please input Jalan name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input Jalan Name"
              onChange={handleInputChange('addrLine2')}
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
