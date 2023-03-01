import { Button, Card, Form, Input, InputNumber, Layout, Space } from "antd";
import React, { useState } from "react";
import Buttons from "../../components/Button";
import Layouts from "@/layouts/layout";
import { useDispatch } from "react-redux";
import { doAddDataUser } from "@/Redux/Action/User/GetDataUser";

export default function Register(): any {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [Number, setNumber] = useState("");

  const { Content } = Layout;
  const { Meta } = Card;
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    if (Number === '') {
      setError("Number Phone must be a number");
    } else if (password !== confirmPassword) {
      setError("Password do not match");
      setTimeout(() => {}, 5000);
    } else {
      console.log("Success:", values);
      dispatch(doAddDataUser(values));
      window.location.href = "/users/login";
    }
  };

  // const HandleNumberInput = (value :any) => {
  //     if (typeof(value) !== 'number'){
  //       setError('Phone number must be a number');
  //     }
  //     }
  // const handleSubmit = (values :any) => {

  // }

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#fff",
    marginBottom: 30,
  };

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
                label="Fullname"
                name="userFullName"
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
                name="userEmail"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
                required
                label="Email"
              >
                <Input
                  type="Email"
                  placeholder="Your Email"
                  // onChange={eventHandler("password")}
                />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="userPhoneNumber"
                rules={[
                  { required: true, message: "Please input your Number!" },
                ]}
                required
              >
                <Input
                  style={{ width: 300 }}
                  type="Phone Number"
                  placeholder="Your Phone Number, ex: +62822..."
                  value={Number}
                  maxLength={12}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="UserPassword"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                required
              >
                <Input.Password
                  type="password"
                  value={password}
                  placeholder="Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="password1"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                required
              >
                <Input.Password
                  value={confirmPassword}
                  type="password"
                  placeholder="Re-type Your Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Item>
              {error && <div className="error text-red-600 mb-2">{error}</div>}
              <Button htmlType="submit" className="login-form-button mt-0">
                Register
              </Button>

              <Form.Item>
                Do you have an account? <a href="/users/login">Sign In </a>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Content>
    </Layouts>
  );
}
