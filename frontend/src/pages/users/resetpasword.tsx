import Buttons from "@/components/Button";
import {
    LockOutlined,
    LogoutOutlined,
    UserOutlined
} from "@ant-design/icons";
import {
    Card,
    Col,
    Form,
    Input,
    Menu,
    MenuProps,
    Modal,
    Row
} from "antd";
import Link from "next/link";
import router from "next/router";
import React, { useState } from "react";
import Layouts from "../../layouts/layout";

export default function ResetPassword() {
  type MenuItem = Required<MenuProps>["items"][number];


  const onFinish = (values: any) => {
    // console.log("Success:", values);
  };

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  const { Meta } = Card;
  const items: MenuProps["items"] = [
    getItem("Personal Detail", "1", <UserOutlined />),
    getItem("Reset Password", "2", <LockOutlined />),
  ];

  //Button
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('It will be saved');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <Layouts>
      <Row>
        <Col span={6} className="mt-10 mx-5">
          <Card>
            <Meta
              avatar={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
              title="Profile Settings"
            />
            <Menu
              onClick={() => router.push("userprofile")}
              style={{ width: 238, border:'none' }}
              defaultSelectedKeys={["2"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items}
              className="mt-4 pb-16"
            />

            <Link href="/">
              <Row>
                <Col span={2}>
                  <LogoutOutlined />
                </Col>
                <Col span={8}> Sign Out </Col>
              </Row>
            </Link>
          </Card>
        </Col>
        <Col span={15} className="mt-10">
          <Card className="pl-1 pb-16">
            <Meta title="CHANGE YOUR PASSWORD" style={{ marginLeft: 150 }} />

            <Form
              layout="vertical"
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              style={{
                marginTop: 30,
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
                name="password"
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
                name="password"
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

              <Buttons type="danger" funcs={showModal} >
               Change Password
              </Buttons>
              <Modal
                title="Are you sure?"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                
              >
                <p>{modalText}</p>
              </Modal>
            </Form>
          </Card>
        </Col>
      </Row>
    </Layouts>
  );
}
