import withAuth from "@/PrivateRoute/WithAuth";
import { addFapho } from "@/Redux/Action/Hotel/HotelAction";
import Buttons from "@/components/Button";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Select, Upload, UploadProps } from "antd";
import { RcFile, UploadFile } from "antd/es/upload";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default withAuth( function AddPhoto(props: any) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const formik = useFormik({
    initialValues: {
      faphoFaciId: props.id,
      faphoPrimary: undefined,
      faphoUrl: undefined,
    },
    onSubmit: async (values: any) => {
      const formData = new FormData();
      formData.append("faphoFaciId", values.faphoFaciId);
      formData.append("faphoPrimary", values.faphoPrimary);

      for (let i = 0; i < values.faphoUrl.length; i++) {
        formData.append("faphoUrl", values.faphoUrl[i]);
      }

      try {
        setUploading(true);
        await dispatch(addFapho(formData));
        props.closeUpload();
        props.onRefresh();
        // window.location.reload();
      } catch (error) {
        console.log("Upload error:", error);
      } finally {
        setUploading(false);
      }
    },
  });

  const handleUpload = () => {
    formik.handleSubmit();
  };

  const upld: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      formik.setFieldValue("faphoUrl", newFileList);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      formik.setFieldValue("faphoUrl", [...fileList, file]);
      return false;
    },
    fileList,
  };
  const stat = [
    { value: true, label: "Primary" },
    { value: false, label: "Not Primary" },
  ];

  return (
    <Form
      form={form}
      onFinish={formik.handleSubmit}
      layout="vertical"
      style={{ maxWidth: 600 }}
      className="px-5 py-5 border shadow rounded-lg mx-auto"
    >
      <Form.Item
        name="faphoPrimary"
        label="Photo Status"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Select
          placeholder="Photo Status}"
          value={formik.values.faphoPrimary}
          onChange={(value: any) => formik.setFieldValue("faphoPrimary", value)}
        >
          {stat.map((item: any, index: any) => (
            <Select.Option key={index} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Upload {...upld}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? "Uploading" : "Start Upload"}
        </Button>
      </Form.Item>
    </Form>
  );
}
)