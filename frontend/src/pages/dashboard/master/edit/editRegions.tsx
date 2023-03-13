import { doUpdateRegions } from '@/Redux/Action/Master/actionRegions';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function EditRegions(props: any) {
  const dispatch = useDispatch();
  const idRegions = props.idRegions;
  const dataRegions = props.dataRegions;
  const { handleClose } = props;
  const details = dataRegions.find(
    (item: any) => item.region_code == idRegions
  );
  const [formValues, setFormValues] = useState(details);

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };
  
  const onFinish = () => {
    dispatch(doUpdateRegions(formValues));
    handleClose(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title="Edit Data Regions"
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
            label="Region Name"
            name="region_name"
            rules={[{ required: true, message: 'Please input region name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input Regions Name"
              onChange={handleInputChange('region_name')}
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
