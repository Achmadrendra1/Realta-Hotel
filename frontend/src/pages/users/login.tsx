import { doLogin } from "@/Redux/Action/User/auth";
import Layouts from "@/layouts/layout";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, message } from "antd";
import { Layout } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const { Content } = Layout;
  const { IsAuth, error } = useSelector((state: any) => state.loginReducer);
  const dispatch = useDispatch();
  const route = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  //kalo udah pake form gausah pake ini
  // const [login, setLogin]: any = useState({
  //   email: "",
  //   password: "",
  // });

  // let eventHandler = (input: any) => (event: any) => {
  //   setLogin({ ...login, [input]: event.target.value });
  // };

  // let Logins = (e: any) => {
  //   e.preventDefault();
  //   dispatch(doLogin(login));
  // };

  useEffect(() => {
    if (IsAuth) {
       
      messageApi
        .open({
          type: "loading",
          content: "loading....",
          duration: 1,
        })
        .then(() => message.success("Login Berhasil", 0.5))
        .then(() =>  route.push("/"));
    }
  }, [IsAuth]);

  useEffect(() => {
    if (error !== null) {
      messageApi
        .open({
          type: "loading",
          content: "loading....",
          duration: 1,
        })
        .then(() => message.error(error, 0.5));
    }
  }, [error]);

  //Pas click submit dispatch langsung, kalo formnya masih kosong validasi muncul
  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(doLogin(values));
  };

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#fff",
  };

  const { Meta } = Card;
  return (
    <Layouts>
      <Content style={contentStyle}>
        {contextHolder}
        <Space size={10}>
          <Card size="small">
            <Meta title="SIGN IN TO YOUR ACCOUNT" style={{ marginTop: 30 }} />

            <Form
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
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder=" Your Email"
                  // onChange={eventHandler("email")}
                  maxLength={20}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder=" Your Password"
                  // onChange={eventHandler("password")}
                />
              </Form.Item>
              {/* <Form.Item>
                  <a className="login-form-forgot" href="">
                    Forgot password
                  </a>
                </Form.Item> */}

              <Button
                htmlType="submit"
                className="login-form-button mt-0"
                // onClick={Logins}
              >
                Log in
              </Button>
              <Form.Item>
                Don't have an account? <a href="">register now!</a>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Content>
    </Layouts>
  );
}
