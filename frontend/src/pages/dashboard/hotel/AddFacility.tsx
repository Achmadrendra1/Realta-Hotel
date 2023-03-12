import withAuth from "@/PrivateRoute/WithAuth";
import { addFacility } from "@/Redux/Action/Hotel/HotelAction";
import Buttons from "@/components/Button";
import { Form, Input, Modal, Select, Typography } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

export default withAuth( function AddFacilities(props: any) {
  const dispatch = useDispatch();
  const { Title, Text } = Typography;
  const [form] = Form.useForm();
  const { handleClose } = props;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      faciName: undefined,
      faciDescription: undefined,
      faciMaxNumber: undefined,
      faciMeasureUnit: undefined,
      faciRoomNumber: undefined,
      faciStartdate: undefined,
      faciEnddate: undefined,
      faciLowPrice: undefined,
      faciHighPrice: undefined,
      faciRatePrice: undefined,
      faciDiscount: undefined,
      faciTaxRate: undefined,
      faciModifiedDate: undefined,
      faciCagro: undefined,
      faciHotel: props.htlid,
    },
    onSubmit: async (values: any) => {
      let payload = new FormData();
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

      dispatch(addFacility(payload));
      handleClose(false);
      window.location.reload();
    },
  });

  const Cagro = [
    { value: "1", label: "Room" },
    { value: "2", label: "Restaurant" },
    { value: "3", label: "Meeting Room" },
    { value: "4", label: "Gym" },
    { value: "5", label: "Aula" },
    { value: "6", label: "Swimming Pool" },
    { value: "7", label: "Ballroom" },
  ];
  const unit = [
    { value: "BED", label: "Bed" },
    { value: "PEOPLE", label: "People" },
  ];

  return (
    <Modal
      open={props.showAdd}
      onOk={props.okAdd}
      onCancel={props.cancelAdd}
      centered
      footer={null}
    >
      <Form
        form={form}
        onFinish={formik.handleSubmit}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <Title level={4} style={{ textAlign: "center" }}>
          {" "}
          Adding {props.htlname} Facilities
        </Title>

        <Form.Item
          name="faciName"
          label="Facility Name"
          rules={[{ required: true, message: "Please input Facility Name!" }]}
        >
          <Input
            type="text"
            name="faciName"
            id="faciName"
            value={formik.values.faciName}
            onChange={formik.handleChange}
            autoComplete="faciName"
          />
        </Form.Item>

        <Form.Item
          name="faciDescription"
          label="Facility Description"
          rules={[{ required: true, message: "Please input Facility Description!" }]}
        >
          <Input.TextArea
            showCount
            maxLength={500}
            name="faciDescription"
            id="faciDescription"
            value={formik.values.faciDescription}
            onChange={formik.handleChange}
            autoComplete="faciDescription"
          />
        </Form.Item>

        <Form.Item
          name="faciMaxNumber"
          label="Facility Max Number"
          rules={[{ required: true, message: "Please input Facility Capacity!" }]}
        >
          <Input
            name="faciMaxNumber"
            id="faciMaxNumber"
            value={formik.values.faciMaxNumber}
            onChange={formik.handleChange}
            autoComplete="faciMaxNumber"
          />
        </Form.Item>

        <Form.Item
          name="faciMeasureUnit"
          label="Facility Measure Unit"
          rules={[{ required: true, message: "Please input Measure Unit!" }]}
        >
          <Select
            placeholder="Measure Unit"
            value={formik.values.faciMeasureUnit}
            onChange={(value) => formik.setFieldValue("faciMeasureUnit", value)}
          >
            {unit.map((item: any, index: any) => (
              <Select.Option key={index} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="faciRoomNumber"
          label="Facility Room Number"
          rules={[{ required: true, message: "Please input Phone Number!" }]}
        >
          <Input
            name="faciRoomNumber"
            id="faciRoomNumber"
            value={formik.values.faciRoomNumber}
            onChange={formik.handleChange}
            autoComplete="faciRoomNumber"
          />
        </Form.Item>

        <Form.Item
          name="faciStartdate"
          label="Facility Start Date"
          rules={[{ required: true, message: "Please input Hotel!" }]}
        >
          <input
            type="date"
            name="faciStartdate"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
            id="faciStartdate"
            value={formik.values.faciStartdate}
            onChange={formik.handleChange}
            autoComplete="faciStartdate"
          />
        </Form.Item>

        <Form.Item
          name="faciEnddate"
          label="Facility End Date"
          rules={[{ required: true, message: "Please input Hotel!" }]}
        >
          <input
            type="date"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
            name="faciEnddate"
            id="faciEnddate"
            value={formik.values.faciEnddate}
            onChange={formik.handleChange}
            autoComplete="faciEnddate"
          />
        </Form.Item>

        <Form.Item
          name="faciLowPrice"
          label="Facility Low Price"
          rules={[{ required: true, message: "Please input Facility Low Price!" }]}
        >
          <Input
            name="faciLowPrice"
            id="faciLowPrice"
            value={formik.values.faciLowPrice}
            onChange={formik.handleChange}
            autoComplete="faciLowPrice"
          />
        </Form.Item>

        <Form.Item
          name="faciHighPrice"
          label="Facility High Price"
          rules={[{ required: true, message: "Please input Facility High Price!" }]}
        >
          <Input
            name="faciHighPrice"
            id="faciHighPrice"
            value={formik.values.faciHighPrice}
            onChange={formik.handleChange}
            autoComplete="faciHighPrice"
          />
        </Form.Item>

        <Form.Item
          name="faciRatePrice"
          label="Facility Rate Price"
          rules={[{ required: true, message: "Please input Facility Rate Price!" }]}
        >
          <Input
            name="faciRatePrice"
            id="faciRatePrice"
            value={formik.values.faciRatePrice}
            onChange={formik.handleChange}
            autoComplete="faciRatePrice"
          />
        </Form.Item>

        <Form.Item
          name="faciDiscount"
          label="Facility Disount"
          rules={[{ required: true, message: "Please input Facility Disount!" }]}
        >
          <Input
            name="faciDiscount"
            id="faciDiscount"
            value={formik.values.faciDiscount}
            onChange={formik.handleChange}
            autoComplete="faciDiscount"
          />
        </Form.Item>

        <Form.Item
          name="faciTaxRate"
          label="Facility Tax Price"
          rules={[{ required: true, message: "Please input Facility Tax Price!" }]}
        >
          <Input
            name="faciTaxRate"
            id="faciTaxRate"
            value={formik.values.faciTaxRate}
            onChange={formik.handleChange}
            autoComplete="faciTaxRate"
          />
        </Form.Item>

        <Form.Item
          name="faciCagro"
          label="Facility Category"
          rules={[{ required: true, message: "Please input Facility Category!" }]}
        >
          <Select
            placeholder="Facility Category"
            value={formik.values.faciCagro}
            onChange={(value) => formik.setFieldValue("faciCagro", value)}
          >
            {Cagro &&
              Cagro.map((item: any, index: any) => (
                <Select.Option key={index} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="faciHotel"
          label="Facility Hotel"
        >
          <Text strong>{props.htlname}</Text>
        </Form.Item>

        <Form.Item label=" " colon={false}>
          <div className="flex justify-end">
            <Buttons type={"danger"} funcs={props.cancleAdd}>
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
})
