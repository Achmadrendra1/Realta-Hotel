import { doUpdatePassword } from "@/Redux/Action/User/GetDataUser";
import Buttons from "@/components/Button";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Menu, Modal, Row } from "antd";
import Link from "next/link";
import router from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function ChangePassword(props: any) {
 const  dispatch = useDispatch();
 const { handleClose } = props;



  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(doUpdatePassword(values));
    handleClose(false);
  };

  //Button
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

 

 
  return (
    <>
      <Modal
        title="Change Password"
        open={props.show}
        onOk={props.clickOk}
        onCancel={props.clickCancel}
        centered
        footer={null}
      >
        <Row>
          <Col span={15} className="mt-10">
            <Form
              layout="vertical"
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              style={{
               
                width: 300,
                marginLeft: 100,
                marginRight: 100,
              }}
            >


              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                required
                tooltip="This is a required field"
                label="Current Password"
              >
                <Input.Password
                  type="password"
                  placeholder="Your Current Password"
                />
              </Form.Item>

              <Form.Item
                name="uspa_passwordhash"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                required
                tooltip="This is a required field"
                label="New Password"
              >
                <Input.Password
                  type="password"
                  placeholder="Your New Password"
                />
              </Form.Item>

              <Form.Item
                name="Confirmpassword"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                required
                tooltip="This is a required field"
                label="Confirm Password"
              >
                <Input.Password
                  type="password"
                  placeholder="Re-type Your Password"
                />
              </Form.Item>

              <Button  htmlType="submit" style={{marginBottom:30}}>
                Change Password
              </Button>
            
             </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
