import { doUpdatePriceItems } from '@/Redux/Action/Master/actionPriceItems';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
} from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function EditPrice(props: any) {
  const dispatch = useDispatch();
  const idPrice = props.idPrice;
  const dataPrice = props.dataPrice;
  const { handleClose } = props;
  const details = dataPrice.find((item: any) => item.pritId == idPrice);
  const [formValues, setFormValues] = useState(details);

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };

  const onFinish = () => {
    dispatch(doUpdatePriceItems(formValues));
    handleClose(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Modal
        title="Edit Data Price"
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
            label="Price Code"
            name="pritId"
            rules={[{ required: true, message: 'Please input Price code!' }]}
          >
            <Input
              disabled
              placeholder="Input Price Code"
              value={formValues.pritId}
              onChange={handleInputChange('pritId')}
            />
          </Form.Item> */}
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Items Name"
            name="pritName"
            rules={[{ required: true, message: 'Please input Items name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '3%',
              }}
              placeholder="Input Items Name"
              onChange={handleInputChange('pritName')}
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
              onChange={handleInputChange('pritPrice')}
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
              onChange={handleInputChange('pritDescription')}
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
