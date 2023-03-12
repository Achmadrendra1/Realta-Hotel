import withAuth from "@/PrivateRoute/WithAuth";
import {
  addHotel,
  getAddress,
  getProvince,
} from "@/Redux/Action/Hotel/HotelAction";
import Buttons from "@/components/Button";
import { Cascader, Form, Input, Modal, Typography } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default withAuth(function AddHotelRealta(props: any) {
  const dispatch = useDispatch();
  const { addrs } = useSelector((state: any) => state.HotelReducer);
  const { prov } = useSelector((state: any) => state.HotelReducer);
  const [cascaderValue, setCascaderValue] = useState<any>([]);
  const { Title, Text } = Typography;
  const { handleClose } = props;

  useEffect(() => {
    dispatch(getAddress());
    dispatch(getProvince());
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
      payload.append("hotelPhonenumber", values.hotelPhonenumber);
      payload.append("hotelModifiedDate", values.hotelModifiedDate);
      payload.append("hotelAddr", cascaderValue);

      values.hotelAddr = cascaderValue;

      dispatch(addHotel(payload));
      handleClose(false);
      window.location.reload();
    },
  });

  const handleCascaderChange = (value: any) => {
    setCascaderValue(value[1]);
  };

  return (
    <Modal
      open={props.showAdd}
      onOk={props.okAdd}
      onCancel={props.cancelAdd}
      centered
      footer={null}
    >
      <Form layout="vertical" onFinish={formik.handleSubmit} autoComplete="off">
        <Title level={4} style={{ textAlign: "center" }}>
          Add Realta Hotel
        </Title>
        <Form.Item
          name="hotelName"
          label="Hotel Name"
          rules={[{ required: true, message: "Please input Hotel Name!" }]}
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
          rules={[
            { required: true, message: "Please input Hotel Description!" },
          ]}
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
            value={cascaderValue} // set the value of Cascader to cascaderValue state
            onChange={(value: any) => {
              setCascaderValue(value[1]); // update the state variable with selected value
              formik.setValues({ ...formik.values, hotelAddr: value[1] }); // update the formik values with selected value
            }}
          />
        </Form.Item>

        <Form.Item
          name="hotelRatingStar"
          label="Hotel Stars"
          rules={[
            { required: true, message: "Please input Hotel Rating Star!" },
          ]}
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
        <Form.Item label=" " colon={false}>
          <div className="flex justify-end">
            <Buttons type="danger" funcs={props.cancelAdd}>
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
});
