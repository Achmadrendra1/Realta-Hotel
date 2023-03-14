import withAuth from "@/PrivateRoute/WithAuth";
import { getFacilityID, updateFacility } from "@/Redux/Action/Hotel/HotelAction";
import Buttons from "@/components/Button";
import { Form, Input, Modal, Typography } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default withAuth( function EditFacilityHotel(props: any) {
  const dispatch = useDispatch();
  const { faciById } = useSelector((state: any) => state.HotelReducer);
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const { handleClose } = props;
  
  useEffect(() => {
    dispatch(getFacilityID(props.id));
  }, [props.id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      faciId: faciById.faciId,
      faciName: faciById.faciName,
      faciDescription: faciById.faciDescription,
      faciMaxNumber: faciById.faciMaxNumber,
      faciMeasureUnit: faciById.faciMeasureUnit,
      faciRoomNumber: faciById.faciRoomNumber,
      faciStartdate: faciById.faciStartdate,
      faciEnddate: faciById.faciEnddate,
      faciLowPrice: faciById.faciLowPrice,
      faciHighPrice: faciById.faciHighPrice,
      faciRatePrice: faciById.faciRatePrice,
      faciDiscount: faciById.faciDiscount,
      faciTaxRate: faciById.faciTaxRate,
      faciModifiedDate: faciById.faciModifiedDate,
      faciCagro: faciById.faciCagro?.cagroId,
      faciHotel: faciById.faciHotel?.hotelId,
    },

    onSubmit: async (values:any) => {
      // console.log(values);

      let payload = new FormData();
      payload.append("faciId", values.faciId);
      payload.append("faciName", values.faciName);
      payload.append("faciDescription", values.faciDescription);
      payload.append("faciMaxNumber", values.faciMaxNumber);
      payload.append("faciMeasureUnit", values.faciMeasureUnit);
      payload.append("faciRoomNumber", values.faciRoomNumber);
      payload.append("faciStartdate", values.faciStartdate);
      payload.append("faciEnddate", values.faciEnddate);
      payload.append("faciLowPrice", values.faciLowPrice);
      payload.append("faciHighPrice", values.faciHighPrice);
      payload.append("faciRatePrice", values.faciRatePrice);
      payload.append("faciDiscount", values.faciDiscount);
      payload.append("faciTaxRate", values.faciTaxRate);
      payload.append("faciModifiedDate", values.faciModifiedDate);
      payload.append("faciCagro", values.faciCagro);
      payload.append("faciHotel", values.faciHotel);

      dispatch(updateFacility(payload));
      handleClose(false)
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
      <Form
      // {...formItemLayout}
      onFinish={formik.handleSubmit}
      // labelCol={{ span: 8 }}
      // wrapperCol={{ span: 10 }}
      layout="vertical"
      style={{ maxWidth: 600 }}
    >
      <Title level={4} style={{ textAlign: "center" }}>
        {" "}
        Edit {props.htlname} Facilities
      </Title>
      <Form.Item
        label="Facility Name"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input
          type="text"
          name="faciName"
          id="faciName"
          value={formik.values?.faciName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="faciName"
        />
      </Form.Item>
      <Form.Item
        label="Facility Description"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input.TextArea
          showCount
          maxLength={500}
          name="faciDescription"
          id="faciDescription"
          value={formik.values?.faciDescription}
          onChange={formik.handleChange}
          autoComplete="faciDescription"
        />
      </Form.Item>
      <Form.Item
        label="Facility Max Number"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input
          type="text"
          name="faciMaxNumber"
          id="faciMaxNumber"
          value={formik.values?.faciMaxNumber}
          onChange={formik.handleChange}
          autoComplete="faciMaxNumber"
        />
      </Form.Item>
      <Form.Item
        label="Facility Measure Unit"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input
          name="faciMeasureUnit"
          id="faciMeasureUnit"
          value={formik.values?.faciMeasureUnit}
          onChange={formik.handleChange}
          autoComplete="faciMeasureUnit"
        />
      </Form.Item>
      {/* <Form.Item
      name='faciRoomNumber'
      label='Facility Room Number'
      rules={[{ required: true, message: 'Please input Phone Number!' }]}
      >
      <Input
        name="faciRoomNumber"
        id="faciRoomNumber"
        value={formik.values?.faciRoomNumber}
        onChange={formik.handleChange}
        autoComplete="faciRoomNumber"
      />
      </Form.Item> */}
      <Form.Item
        label="Facility Start Date"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <input
          type="date"
          name="faciStartdate"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
          id="faciStartdate"
          value={formik.values?.faciStartdate}
          onChange={formik.handleChange}
          autoComplete="faciStartdate"
        />
      </Form.Item>
      <Form.Item
        label="Facility End Date"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <Input
          type="date"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
          name="faciEnddate"
          id="faciEnddate"
          value={formik.values?.faciEnddate}
          onChange={formik.handleChange}
          autoComplete="faciEnddate"
        />
      </Form.Item>
      <Form.Item
        label="Facility Low Price"
        rules={[{ required: true, message: "Please input Phone Number!" }]}
      >
        <Input
          name="faciLowPrice"
          id="faciLowPrice"
          value={formik.values?.faciLowPrice}
          onChange={formik.handleChange}
          autoComplete="faciLowPrice"
        />
      </Form.Item>
      <Form.Item
        label="Facility High Price"
        rules={[{ required: true, message: "Please input Phone Number!" }]}
      >
        <Input
          name="faciHighPrice"
          id="faciHighPrice"
          value={formik.values?.faciHighPrice}
          onChange={formik.handleChange}
          autoComplete="faciHighPrice"
        />
      </Form.Item>
      <Form.Item
        label="Facility Rate Price"
        rules={[{ required: true, message: "Please input Phone Number!" }]}
      >
        <Input
          name="faciRatePrice"
          id="faciRatePrice"
          value={formik.values?.faciRatePrice}
          onChange={formik.handleChange}
          autoComplete="faciRatePrice"
        />
      </Form.Item>
      <Form.Item
        label="Facility Disount"
        rules={[{ required: true, message: "Please input Phone Number!" }]}
      >
        <Input
          name="faciDiscount"
          id="faciDiscount"
          value={formik.values?.faciDiscount}
          onChange={formik.handleChange}
          autoComplete="faciDiscount"
        />
      </Form.Item>
      <Form.Item
        label="Facility Tax Price"
        rules={[{ required: true, message: "Please input Phone Number!" }]}
      >
        <Input
          name="faciTaxRate"
          id="faciTaxRate"
          value={formik.values?.faciTaxRate}
          onChange={formik.handleChange}
          autoComplete="faciTaxRate"
        />
      </Form.Item>
      {/* <Form.Item
        name="faciModifiedDate"
        label="Facility Modified"
        rules={[{ required: true, message: "Please input Hotel!" }]}
      >
        <input
          type="date"
          name="faciModifiedDate"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
          id="faciModifiedDate"
          value={formik.values?.faciModifiedDate}
          onChange={formik.handleChange}
          autoComplete="faciModifiedDate"
        />
      </Form.Item> */}
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