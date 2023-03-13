import {
  doAddCountry,
  doUpdateCountry,
} from '@/Redux/Action/Master/actionCountry';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AddCountry(props: any) {
  const dispatch = useDispatch();
  const { handleClose } = props;

  const regionNamee = props.regionNamee;
  const regionId = props.regionId;
  const dataLocationsRC = props.dataLocationsRC;
  const details = dataLocationsRC.find(
    (item: any) => item.country_region_id == regionId
  );
  const [formValues, setFormValues] = useState(details);

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };

  const onFinish = (data: any) => {
    dispatch(doAddCountry(data));
    dispatch(doUpdateCountry(formValues));
    handleClose(false);
    window.location.reload();
    handleClose(false);
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
        title="Add New Country"
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
            label={`Region Name : ${regionNamee}`}
            name={'country_region_id'}
            rules={[{ required: true, message: 'Please input regions name!' }]}
          >
            <Input
              // type="hidden"
              type="hidden"
              style={{
                width: '80%',
                marginLeft: '10%',
              }}
              placeholder="Input regions Name"
              // onChange={handleInputChange('country_region_id')}
              // disabled
            />
          </Form.Item>

          <Form.Item
            label="Country Name"
            name={'country_name'}
            rules={[{ required: true, message: 'Please input regions name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
              }}
              placeholder="Input Country Name"
              // onChange={handleInputChange('country_name')}
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
