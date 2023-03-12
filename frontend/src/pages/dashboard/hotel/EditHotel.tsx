import withAuth from "@/PrivateRoute/WithAuth";
import { getHotelID, updateHotel } from "@/Redux/Action/Hotel/HotelAction";
import Buttons from "@/components/Button";
import { Form, Input, Modal, Typography } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default withAuth( function EditHotelRealta(props: any) {
  const dispatch = useDispatch();
  const { Title, Text } = Typography;
  const {handleClose} = props
  const { hotelById } = useSelector((state: any) => state.HotelReducer);
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
      handleClose(false);
      props.onRefresh();
      // window.location.reload();
    },
  });

  return (
    <Modal
      open={props.showEdit}
      onOk={props.okEdit}
      onCancel={props.cancelEdit}
      centered
      footer={null}
    >
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Title level={4} style={{ textAlign: "center" }}>
          {" "}
          Edit Realta Hotel{" "}
        </Title>
        <Form.Item
          label="Hotel Name : "
          rules={[{ required: true, message: "Please input Hotel Name!" }]}
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
          rules={[{ required: true, message: "Please input Hotel Description!" }]}
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
          rules={[{ required: true, message: "Please input Hotel Rating Star!" }]}
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
          rules={[{ required: true, message: "Please input Hotel Phone Number!" }]}
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
        <Form.Item label=" " colon={false}>
          <div className="flex justify-end">
            <Buttons type={"danger"} funcs={props.cancleEdit}>
              Cancel
            </Buttons>
            <div className="ml-2">
              <Buttons>Save</Buttons>
            </div>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
)