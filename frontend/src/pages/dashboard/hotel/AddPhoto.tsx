import { addFapho } from '@/Redux/Action/Hotel/HotelAction';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Upload, UploadProps } from 'antd';
import { RcFile, UploadFile } from 'antd/es/upload';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AddPhoto(props: any){
    const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const formik = useFormik({
    initialValues: {
      faphoFaciId: props.id,
      faphoPrimary: false,
      faphoUrl:undefined,
    },
    onSubmit: (values: any) => {
      let payload = new FormData();
      payload.append("faphoFaciId", values.faphoFaciId);
      payload.append("faphoPrimary", values.faphoPrimary);
      payload.append('faphoUrl[]', values.faphoUrl);

      dispatch(addFapho(payload));
      props.closeUpload();
      props.onRefresh();
      window.location.reload();
    },
  });
  console.log(fileList);
  const handleUpload = () => {
    fileList.forEach((file:any) => {
      formik.setFieldValue('faphoUrl[]', file as RcFile )
      // formData.append('files[]', file as RcFile);
    });
    //setUploading(true);
    formik.handleSubmit
    // You can use any AJAX library you like
    // fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      // method: 'POST',
      // body: formData,
    // })
      // .then((res) => res.json())
      // .then(() => {
      //   setFileList([]);
      //   message.success('upload successfully.');
      // })
      // .catch(() => {
      //   message.error('upload failed.');
      // })
      // .finally(() => {
      //   setUploading(false);
      // });
  };

  const upld: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
    
  };
  
  
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 600 }}
      className="px-5 py-5 border shadow rounded-lg mx-auto">
        
      <Upload {...upld}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
        
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
      </Form>
  );
}