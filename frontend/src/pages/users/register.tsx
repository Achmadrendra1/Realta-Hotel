import { Card, Form, Input, InputNumber, Layout, Space } from "antd";
import React from "react";
import Buttons from "../../components/Button";
import Layouts from "../../layouts/layout";

export default function Register(): any {
  const { Content } = Layout;
  const { Meta } = Card;
  

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#fff",
  };

  const fungsiRegister = () =>{
    console.log("fungsi register")
    
  }

  return (
    <Layouts>
      <Content style={contentStyle}>
        <Space size={10}>
          <Card size="small">
            <Meta title="REGISTER YOUR ACCOUNT" style={{ marginTop: 30 }} />

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
                required
                tooltip="This is a required field"
                label="Fullname"
                name="Fullname"
                rules={[
                  { required: true, message: "Please input your Fullname!" },
                ]}
              >
                <Input
                  placeholder="Your Fullname"
                  // onChange={eventHandler("email")}
                  maxLength={20}
                />
              </Form.Item>
              <Form.Item
                name="Email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
                required
                tooltip="This is a required field"
                label="Email"
              >
                <Input
                  type="Email"
                  placeholder="Your Email"
                  // onChange={eventHandler("password")}
                />
              </Form.Item>

              <Form.Item
                name="Phone Number"
                rules={[{ type: "number" }]}
                required
                tooltip="This is a required field"
                label="Phone Number"
              >
                <InputNumber
                  style={{ width: 300 }}
                  type="Phone Number"
                  placeholder="Your Phone Number, ex: +62822..."
                />
              </Form.Item>


              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                required
                tooltip="This is a required field"
                label="Password"
              >
                <Input.Password
                  
                  type="password"
                  placeholder="Your Password"
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

              <Buttons
              funcs={fungsiRegister}
               type="base"
                //   onClick={Logins}
              >
                Register
              </Buttons>
            
              <Form.Item>
                Do you have an account? <a href="/users">Sign now!</a>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Content>
    </Layouts>
  );
}
