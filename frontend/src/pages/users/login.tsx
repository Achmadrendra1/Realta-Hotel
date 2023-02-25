import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Form, Input, Row, Space } from "antd";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    console.log("Success:", values);
    // dispatch(doLogin(values));
  };
  return (
    <div>
      <Row className="bg-stone-100  min-h-screen">
        <Col span={12}>
          <div className="flex ml-5 mt-4">
            <img src="/assets/icon.svg" className="h-7" />
            <h3 className="text-lg font-bold mb-4">otelapp</h3>
          </div>
          <Space direction="vertical" style={{ display: "flex", margin: 70 }}>
            <p style={{ marginLeft: 160 }} className="font-medium text-2xl">
              Welcome Back
            </p>
            <span style={{ marginLeft: 170 }} className="font-medium text-xs">
              Please enter your details.
            </span>

            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              layout="vertical"
              onFinish={onFinish}
              style={{
                marginTop: 10,
                width: 300,
                marginLeft: 100,
                marginRight: 100,
              }}
            >
              <Form.Item
                name="email"
                rules={[{ message: "Please input your Email!" }]}
              >
                <label className="block font-medium mb-2">Email</label>
                <Input
                  //   prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Enter your email"
                  maxLength={20}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ message: "Please input your Password!" }]}
              >
                <label className="block font-medium mb-2" >Password</label>
                <Input.Password
                  //   prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="*******"
                  // onChange={eventHandler("password")}
                />
              </Form.Item>

                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox >
                    <p className="font-medium text-xs">
                    Remember me
                    </p> 
                    </Checkbox>
                </Form.Item>

                <a className=" font-medium text-xs text-[#0e7490]" href="" style={{marginLeft:90}} >
                  Forgot password
                </a>
             
              

              <Button htmlType="submit" className="login-form-button mt-3" style={{width:300}}>
                Sign in
              </Button>
              <Form.Item style={{marginLeft:40, marginTop:5}}>
               
                Don't have an account yet?
                
                <a href="" className="font-sans ml-1 text-[#0e7490]" >
                Sign Up
                </a>
              </Form.Item>
            </Form>
          </Space>
        </Col>
        <Col span={12}>
          <img
            className="bg-origin-border min-h-screen"
            src="/assets/content-1.jpg"
            alt="hotel.png"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
