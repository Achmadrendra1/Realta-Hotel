import { doUpdateServiceTask } from '@/Redux/Action/Master/actionServiceTask';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function EditService(props: any) {
  const dispatch = useDispatch();
  const idService = props.idService;
  const dataService = props.dataService;
  const { handleClose } = props;
  const details = dataService.find((item: any) => item.setaId == idService);
  const [formValues, setFormValues] = useState(details);

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };

  const onFinish = () => {
    dispatch(doUpdateServiceTask(formValues));
    handleClose(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);  
  };

  return (
    <>
      <Modal
        title="Edit Data Service"
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
            label="Service Code"
            name="setaId"
            rules={[{ required: true, message: 'Please input Service code!' }]}
          >
            <Input
              disabled
              placeholder="Input Service Code"
              value={formValues.setaId}
              onChange={handleInputChange('setaId')}
            />
          </Form.Item> */}
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Service Name"
            name="setaName"
            rules={[{ required: true, message: 'Please input Service name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input Service Name"
              onChange={handleInputChange('setaName')}
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
