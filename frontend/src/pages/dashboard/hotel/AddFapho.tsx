import { addFapho } from "@/Redux/Action/Hotel/HotelAction";
import Dashboard from "@/layouts/dashboard";
import { Form, Input, Select, Typography } from "antd";
import { useFormik } from "formik";
import * as React from "react";
import { useDispatch } from "react-redux";

export default function AddFacilityPhoto(props: any) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {Title, Text} = Typography
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const formik = useFormik({
    initialValues: {
      faphoFaciId: undefined,
      faphoThumbnailFilename: undefined,
      faphoPhotoFilename: undefined,
      faphoPrimary: undefined,
      faphoUrl: undefined,
      faphoModifiedDate: undefined,
    },
    onSubmit: async (values: any) => {
      let payload = new FormData();
      payload.append("faphoFaciId", values.faphoFaciId);
      payload.append("faphoThumbnailFilename", values.faphoThumbnailFilename);
      payload.append("faphoPhotoFilename", values.faphoPhotoFilename);
      payload.append("faphoPrimary", values.faphoPrimary);
      payload.append("faphoUrl", values.faphoUrl);
      payload.append("faphoModifiedDate", values.faphoModifiedDate);

      dispatch(addFapho(payload));
      window.alert("Data Successfully Added");
    },
  });

  return (
    <Dashboard>
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        className = "py-5 border shadow rounded-lg mx-auto"
    >
      <Title level={3} className="text-center">
        Add Facilities Photo
      </Title>
      <Form.Item
        name="faphoFaciId"
        label="Facility ID"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input
          type="text"
          name="faphoFaciId"
          id="faphoFaciId"
          value={formik.values.faphoFaciId}
          onChange={formik.handleChange}
          autoComplete="faphoFaciId"
        />
      </Form.Item>
      <Form.Item
        name="faphoThumbnailFilename"
        label="Photo Thumbnail Name"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input
          type="text"
          name="faphoThumbnailFilename"
          id="faphoThumbnailFilename"
          value={formik.values.faphoThumbnailFilename}
          onChange={formik.handleChange}
          autoComplete="faphoThumbnailFilename"
        />
      </Form.Item>
      <Form.Item
        name="faphoPhotoFilename"
        label="Photo File Name"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input
          type="text"
          name="faphoPhotoFilename"
          id="faphoPhotoFilename"
          value={formik.values.faphoPhotoFilename}
          onChange={formik.handleChange}
          autoComplete="faphoPhotoFilename"
        />
      </Form.Item>
      <Form.Item
        name="faphoPrimary"
        label="Photo Status"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Select placeholder='Photo Status'>
            <Select.Option value='0'>Not Primary</Select.Option>
            <Select.Option value='1'>Primary</Select.Option>
          </Select>
      </Form.Item>
      <Form.Item
        name="faphoUrl"
        label="Insert Foto"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input
          type="text"
          name="faphoUrl"
          id="faphoUrl"
          value={formik.values.faphoUrl}
          onChange={formik.handleChange}
          autoComplete="faphoUrl"
        />
      </Form.Item>
      <Form.Item
      name='faphoModifiedDate'
      label='Photo Modified'
      rules={[{ required: true, message: 'Please input Hotel!' }]}
      >
      <input
        type="date"
        name="faphoModifiedDate"
        id="faphoModifiedDate"
        value={formik.values.faphoModifiedDate}
        onChange={formik.handleChange}
        autoComplete="faphoModifiedDate"
      />
      </Form.Item>
      <div>
        <button
          type="submit"
          className="cursor-pointer inline-flex justify-center py-2 px-2 shadow-sm text-sm font-medium rounded-md text-indigo-500 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={formik.handleSubmit}
        >
          {" "}
          Simpan{" "}
        </button>
        <button
          className="cursor-pointer inline-flex justify-center py-2 px-2 shadow-sm text-sm font-medium rounded-md text-indigo-500 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {" "}
          Cancel{" "}
        </button>
      </div>
    </Form>
    </Dashboard>
  );
}
