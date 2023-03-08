import { doAddCategoryGroup } from '@/Redux/Action/Master/actionCategoryGroup';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  message,
} from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AddCategory(props: any) {
  const dispatch = useDispatch();
  const { handleClose } = props;

  //D  versi
  const onFinish = (e: any) => {
    console.log('Success:', e);
    dispatch(doAddCategoryGroup(dataUp));
    console.log(dataUp)
    handleClose(false);
    // window.location.reload();

    alert;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  //D PICTURE

  const [dataUp, setDataUp] = useState(new FormData());
  const [selectedImage, setSelectedImage] = useState('');
  // body inputan
  const [namaCagro, setNamaCagro] = useState('');
  const [tipeCagro, setTipeCagro] = useState('');
  const [deskCagro, setDeskCagro] = useState('');

  const handleInputNama = (value: any) => {
    setNamaCagro(value.target.value);
  };
  const handleInputType = (value: any) => {
    setTipeCagro(value);
  };
  const handleInputDesk = (value: any) => {
    setDeskCagro(value.target.value);
  };

 

  const onUploadLogo = (e: any) => {
    const img = e.target.files[0];
    
    let formData = new FormData();
    formData.append('file', img);
    formData.append('cagroName', namaCagro);
    formData.append('cagroDescription', tipeCagro);
    formData.append('cagroType', deskCagro);
    setDataUp(formData);
    console.log(formData)
  };

  const [form] = Form.useForm();

  const getSrcFromFile = (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  };

  const [fileList, setFileList] = useState([
    {
      name: '',
      uid: '-1',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  //Alert
  const [visible, setVisible] = useState('hidden');
  const alert = (e: any) => {
    // window.location.reload();
    setVisible('');
    setTimeout(() => {
      setVisible('hidden');
    }, 777);
  };

  return (
    <>
      <Modal
        title="Add New Category"
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
        >
          <p>
            <Divider style={{ borderWidth: '2px' }} />
          </p>
          <Form.Item
            style={{ marginTop: '5%' }}
            label="Group Name"
            name={'cagroName'}
            rules={[{ required: true, message: 'Please input Group Name!' }]}
          >
            <Input
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '1%',
              }}
              placeholder="Input Group Name"
              onChange={handleInputNama}
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: '3%' }}
            label="Type"
            name={'cagroType'}
            rules={[{ required: true, message: 'Please input Category name!' }]}
          >
            <Select
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '1%',
              }}
              placeholder="Select a Category Type"
              onChange={handleInputType}
            >
              <Select.Option value="Facility">Facility</Select.Option>
              <Select.Option value="Service">Service</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={{ marginTop: '3%' }}
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
              onChange={handleInputDesk}
              autoSize={{ minRows: 5 }}
            />
          </Form.Item>
          <Form.Item label="Upload">
            <Input type="file" onChange={onUploadLogo} accept="image/*" />
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
