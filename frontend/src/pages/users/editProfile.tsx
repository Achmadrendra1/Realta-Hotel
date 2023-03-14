import { doUpdate } from "@/Redux/Action/User/GetDataUser";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

export default function EditProfile(props: any) {
  const dispatch = useDispatch();
  const id = props.id;
  const data = props.data;
  const { handleClose } = props;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const user = data.find((item: any) => item[0]?.user_id == id);
  
  // console.log(user);

  const [formValues, setFormValues] = useState({
    user_full_name:"",
    user_type:"",
    user_company_name:"",
    user_email:"",
    user_phone_number:"",
    uspro_national_id:"",
    uspro_birth_date:"",
    uspro_job_title:"",
    uspro_marital_status:"",
    uspro_gender:"",
    usro_role:"",
    role_name:"",
  });
// console.log('t',formValues)
  useEffect (()=>{
    setFormValues(user)
  },[user])

  
  const onFinish = () => {
    // console.log("Success:", formValues);
    dispatch(doUpdate(formValues));
    handleClose(false);
    message.success("Data Berhasil Diubah", 1.5)
  };

 

  const handleInputChange = (input: any) => (e: any) => {
    setFormValues({ ...formValues, [input]: e.target.value });
  };

  const handleSelectRoleChange = (value: any) => {
    setFormValues({ ...formValues, usro_role: value });
  };
  const handleSelectGenderChange = (value: any) => {
    setFormValues({ ...formValues, uspro_gender: value });
  };
  const handleSelectTypeChange = (value: any) => {
    setFormValues({ ...formValues, user_type: value });
  };
  const handleSelectMaritalChange = (value: any) => {
    setFormValues({ ...formValues, uspro_marital_status: value });
  };
  const handleSelectDateChange = (dateString :any) => {
    setFormValues({ ...formValues, uspro_birth_date:dateString });
  };


  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Edit General"
        open={props.show}
        onCancel={props.clickCancel}
        style={{ top: 20 }}
        width={700}
        footer={null}
        onOk={props.clickOk}
      >
        <Form
          form={form}
          layout="horizontal"
          name="form_in_modal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={formValues}
        >
          <h1 className="text-bold">General</h1>
          <Row style={{ marginTop: 20 }}>
            <Col span={12}>
              <Form.Item
                label="Name"
                style={{ width: 250 }}
               
              >
                <Input
                  placeholder=""
                  value={formValues.user_full_name}
                  style={{ marginLeft: 49 }}
                  onChange={handleInputChange("user_full_name")}
                />
              </Form.Item>

              <Form.Item label="Type"  style={{ width: 243 }}>
                <Select
                  style={{ marginLeft: 56 }}
                  onChange={handleSelectTypeChange}
                  value={formValues.user_type}
                >
                  <Select.Option value="T">Travel Agent</Select.Option>
                  <Select.Option value="C">Corporate</Select.Option>
                  <Select.Option value="I">Individu</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Handphone">
                <Input
                  prefix={"+62"}
                  value={formValues.user_phone_number}
                  style={{ marginLeft: 10, width: 180 }}
                  placeholder="082287851605"
                  onChange={handleInputChange("user_phone_number")}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Email">
                <Input
                value={formValues.user_email}
                  style={{ marginLeft: 35, width: 180 }}
                  onChange={handleInputChange("user_email")}
                />
              </Form.Item>

              <Form.Item label="Company" >
                <Input
                value={formValues.user_company_name}
                  style={{ marginLeft: 10, width: 180 }}
                  onChange={handleInputChange("user_company_name")}
                />
              </Form.Item>
              {user?.role_name === "Admin" ? (
                <Form.Item
                  label="Role Type"
                  style={{ width: 250 }}
                >
                  <Select
                    style={{ marginLeft: 10 }}
                    value={formValues.role_name}
                    onChange={handleSelectRoleChange}
                  >
                    <Select.Option value="1">Guest</Select.Option>
                    <Select.Option value="2">Manager</Select.Option>
                    <Select.Option value="3">Office Boy</Select.Option>
                    <Select.Option value="4">Admin</Select.Option>
                    <Select.Option value="5">User</Select.Option>
                  </Select>
                </Form.Item>
              ) :
              <Form.Item
              label="Role Type"
              style={{ width: 250 }}
              
                      >
                <Input 
                value={formValues.role_name} 
                 disabled 
                 style={{ marginLeft: 10 }} /> 

              </Form.Item>
                }
            </Col>
          </Row>
          <h1 className="text-bold">Profile</h1>
          <Row style={{ marginTop: 10 }}>
            <Col span={12}>
              <Form.Item label="National Id">
                <Input
                  style={{ marginLeft: 15, width: 180 }}
                  value={formValues.uspro_national_id}
                  placeholder="132-2456-98098-001"
                  onChange={handleInputChange("uspro_national_id")}
                />
              </Form.Item>

              <Form.Item label="Job Title" >
                <Input
                value={formValues.uspro_job_title}
                  style={{ marginLeft: 30, width: 180 }}
                  onChange={handleInputChange("uspro_job_title")}
                />
              </Form.Item>

              <Form.Item
                label="Gender"
                style={{ width: 240 }}
              >
                <Select
                value={formValues.uspro_gender}
                  style={{ marginLeft: 35 }}
                  onChange={handleSelectGenderChange}
                >
                  <Select.Option value="M">Male</Select.Option>
                  <Select.Option value="F">Female</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label="Birth Date" name="uspro_birth_date">
                <DatePicker
                  style={{ marginLeft: 8 }}
                  // value={formValues.uspro_birth_date}
                  format="YYYY-MM-DD"
                  onChange={handleSelectDateChange}
                  // onChange={(date:any) => handleSelectDateChange(date)}
                />
              </Form.Item>

              <Form.Item
                label="Marital"
                style={{ width: 240 }}
              >
                <Select
                  style={{ marginLeft: 20 }}
                  value={formValues.uspro_marital_status}
                  onChange={handleSelectMaritalChange}
                >
                  <Select.Option value="S">Single</Select.Option>
                  <Select.Option value="M">Married</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <button
            type="submit"
            className="bg-[#754CFF] hover:bg-purple-500 text-white px-4 py-3 my-2 rounded-lg font-medium w-30"
            style={{ marginBlockEnd: 10, marginLeft: 520 }}
          >
            Save
          </button>
        </Form>
      </Modal>
    </>
  );
}