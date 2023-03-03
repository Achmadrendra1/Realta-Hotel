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
import { InboxOutlined } from '@ant-design/icons';

//image
import ImgCrop, { ImgCropProps } from 'antd-img-crop';

export default function AddCategory(props: any) {
  const dispatch = useDispatch();
  const { handleClose } = props;

  const onFinish = (data: any) => {
    dispatch(doAddCategoryGroup(data));
    handleClose(false);
    alert;
  };

  const onFinishFailed = (errorInfo: any) => {
  };

  //Alert
  const [visible, setVisible] = useState('hidden');
  const alert = (e: any) => {
    window.location.reload();
    setVisible('');
    setTimeout(() => {
      setVisible('hidden');
    }, 777);
  };

  const [file, setFile] = useState('');
  const { Search } = Input;

  //PICTURE
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

  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: any) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
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
            >
              <Select.Option value="Facility">Facility</Select.Option>
              <Select.Option value="Service">Service</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={{ marginTop: '3%' }}
            label="Policy Rules"
            name={'poliName'}
          >
            <Search
              style={{
                width: '80%',
                marginLeft: '10%',
                marginTop: '1%',
              }}
              placeholder="Search Policy Rules"
            />
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
              autoSize={{ minRows: 5 }}
            />
          </Form.Item>
          <ImgCrop grid rotate>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length && '+ Upload'}
            </Upload>
          </ImgCrop>
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
