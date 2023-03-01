import {
  addHotel,
  getAddress,
  getProvince,
} from "@/Redux/Action/Hotel/HotelAction";
import { Cascader, Form, Input, Typography } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddHotelRealta(props: any) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const [cascaderValue, setCascaderValue] = useState<any>([]);
  const { addrs } = useSelector((state: any) => state.HotelReducer);
  const { prov } = useSelector((state: any) => state.HotelReducer);

  useEffect(() => {
    dispatch(getAddress())
    dispatch(getProvince())
  }, []);

  const formik = useFormik({
    initialValues: {
      hotelName: undefined,
      hotelDescription: undefined,
      hotelRatingStar: undefined,
      hotelPhonenumber: undefined,
      hotelModifiedDate: undefined,
      hotelAddr: undefined,
    },
    onSubmit: async (values: any) => {
      let payload = new FormData();
      payload.append("hotelName", values.hotelName);
      payload.append("hotelDescription", values.hotelDescription);
      payload.append("hotelRatingStar", values.hotelRatingStar);
      payload.append("hotelPhoneNumber", values.hotelPhonenumber);
      payload.append("hotelModifiedDate", values.hotelModifiedDate);
      payload.append("hotelAddr", cascaderValue);

      values.hotelAddr = cascaderValue;

      dispatch(addHotel(payload));
      props.closeAdd();
      window.alert("Data Successfully Added");
      props.onRefresh();
      window.location.reload();
    },
  });
  const handleCascaderChange = (value: any) => {
    setCascaderValue(value[1]);
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
  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      className="py-5 border shadow rounded-lg mx-auto"
    >
      <Title level={4} style={{textAlign: 'center'}}>Add Realta Hotel</Title>
      <Form.Item
        name="hotelName"
        label="Hotel Name"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input
          type="text"
          name="hotelName"
          id="hotelName"
          value={formik.values?.hotelName}
          onChange={formik.handleChange}
          autoComplete="hotelName"
        />
      </Form.Item>
      <Form.Item
        name="hotelDescription"
        label="Hotel Description"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input.TextArea
          showCount
          maxLength={500}
          name="hotelDescription"
          id="hotelDescription"
          value={formik.values?.hotelDescription}
          onChange={formik.handleChange}
          autoComplete="hotelDescription"
        />
      </Form.Item>
      <Form.Item
        name="hotelAddr"
        label="Hotel Address"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Cascader
          options={
            prov &&
            prov.map((item: any) => ({
              value: item.provId,
              label: item.provName,
              children:
                addrs &&
                addrs
                  .filter(
                    (items: any) => items.addrProv?.provId === item.provId
                  )
                  .map((item: any) => ({
                    value: item.addrId,
                    label: item.addrLine1,
                  })),
            }))
          }
          value={formik.values?.hotelAddr} // nilai Cascader aktual diatur dari state
          onChange={(value: any) => {
            setCascaderValue(value[1]); // update the state variable with selected value
            formik.setValues({ ...formik.values, hotelAddr: value[1] }); // update the formik values with selected value
          }}
        />

        {/* <Input
          name="hotelAddr"
          id="hotelAddr"
          value={formik.values?.hotelAddr}
          onChange={formik.handleChange}
          autoComplete="hotelAddr"
        /> */}
      </Form.Item>
      <Form.Item
        name="hotelRatingStar"
        label="Hotel Rating"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input
          name="hotelRatingStar"
          id="hotelRatingStar"
          value={formik.values?.hotelRatingStar}
          onChange={formik.handleChange}
          autoComplete="hotelRatingStar"
        />
      </Form.Item>
      <Form.Item
        name="hotelPhonenumber"
        label="Hotel Phone Number"
        rules={[{ required: true, message: "Please input Phone Number!" }]}
      >
        <Input
          name="hotelPhonenumber"
          id="hotelPhonenumber"
          value={formik.values?.hotelPhonenumber}
          onChange={formik.handleChange}
          autoComplete="hotelPhonenumber"
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
          onClick={() => props.setDisplay(false)}
        >
          {" "}
          Cancel{" "}
        </button>
      </div>
    </Form>
  );
}
