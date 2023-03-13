import {
  doCategoryGroup,
  doUpdateCategoryGroup,
} from '@/Redux/Action/Master/actionCategoryGroup';
import { InboxOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal, Select, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function EditCategory(props: any) {
  const dispatch = useDispatch();
  const { handleClose } = props;

  const idCategory = props.idCategory;
  const dataCategory = props.dataCategory;
  const details = dataCategory.find((item: any) => item.cagroId == idCategory);
  const [formValues, setFormValues] = useState(details);

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };

  const onFinish = (event: any) => {
    dispatch(doUpdateCategoryGroup(formValues));
    handleClose(false);
  };

  const onFinishFailed = (errorInfo: any) => {
  };

  return (
    <>
      <Modal
        title="Edit Data Category"
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
            style={{ marginTop: '1%' }}
            label="Group Name"
            name={'cagroName'}
            rules={[{ required: true, message: 'Please input Group name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '1%',
              }}
              placeholder="Input Category Name"
              onChange={handleInputChange('cagroName')}
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: '1%' }}
            label="Type"
            name={'cagroType'}
            rules={[{ required: true, message: 'Please input Group name!' }]}
          >
            <Select
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '1%',
              }}
              placeholder="Select a Category Type"
              onChange={handleInputChange('cagroType')}
            >
              <Select.Option value="type1">Facility</Select.Option>
              <Select.Option value="type2">Service</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={{ marginTop: '1%' }}
            label="Descriptions"
            name={'cagroDescription'}
            rules={[{ required: true, message: 'Please input Description!' }]}
          >
            <Input.TextArea
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '1%',
              }}
              placeholder="  Descriptions"
              autoSize={{ minRows: 5 }}
              onChange={handleInputChange('cagroDescription')}
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
