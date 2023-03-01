import { getHotelID, updateHotel } from "@/Redux/Action/Hotel/HotelAction";
import { Form, Input, Typography } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EditHotelRealta(props: any) {
  const dispatch = useDispatch();
  const { Title, Text } = Typography;
  const { hotelById } = useSelector((state: any) => state.HotelReducer);
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  useEffect(() => {
    dispatch(getHotelID(props.id));
  }, [props.id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      hotelId: hotelById.hotelId,
      hotelName: hotelById.hotelName,
      hotelDescription: hotelById.hotelDescription,
      hotelRatingStar: hotelById.hotelRatingStar,
      hotelPhonenumber: hotelById.hotelPhonenumber,
      hotelModifiedDate: hotelById.hotelModifiedDate,
      hotelAddr: hotelById.hotelAddr,
    },
    onSubmit: async (values: any) => {
      let payload = new FormData();
      payload.append("hotelId", values.hotelId);
      payload.append("hotelName", values.hotelName);
      payload.append("hotelDescription", values.hotelDescription);
      payload.append("hotelRatingStar", values.hotelRatingStar);
      payload.append("hotelPhonenumber", values.hotelPhonenumber);
      payload.append("hotelModifiedDate", values.hotelModifiedDate);

      dispatch(updateHotel(payload));
      props.closeEdit();
      window.alert("Data Successfully Edited");
      props.onRefresh();
      window.location.reload();
    },
  });

  return (
    <Form
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      className="py-5 border shadow rounded-lg mx-auto"
    >
      <Title level={4} style={{ textAlign: "center" }}>
        {" "}
        Edit Realta Hotel{" "}
      </Title>
      <Form.Item
        label="Hotel Name : "
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input
          type="text"
          name="hotelName"
          id="hotelName"
          value={formik.values?.hotelName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="hotelName"
        />
      </Form.Item>

      <Form.Item
        label="Hotel Description : "
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input.TextArea
          showCount
          maxLength={500}
          name="hotelDescription"
          id="hotelDescription"
          value={formik.values?.hotelDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="hotelDescription"
        />
      </Form.Item>

      <Form.Item
        label="Hotel Rating Star : "
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input
          type="text"
          name="hotelRatingStar"
          id="hotelRatingStar"
          value={formik.values?.hotelRatingStar}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="hotelRatingStar"
        />
      </Form.Item>

      <Form.Item
        label="Hotel Phone Number : "
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input
          type="text"
          name="hotelPhonenumber"
          id="hotelPhonenumber"
          value={formik.values?.hotelPhonenumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
