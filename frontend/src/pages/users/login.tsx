import { doLogin } from "@/Redux/Action/User/auth";
import loginStyle from "@/styles/login.module.css";
import {
  Avatar,
  Card,
  Carousel,
  Col,
  Form,
  Input,
  Layout,
  Row,
  message
} from "antd";
import { DotPosition } from "antd/es/carousel";
import Link from "next/link";
import  {useRouter}  from "next/router";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import Layouts from "@/layouts/layout";

export default function Login() {
  const { Content } = Layout;
  const { IsAuth, error } = useSelector((state: any) => state.loginReducer);
  const dispatch = useDispatch();
  const route = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (IsAuth) {
      messageApi
        .open({
          type: "loading",
          content: "loading....",
          duration: 1,
        })
        .then(() => message.success("Login Berhasil", 0.5))
        .then(() => route.push("/"));
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
    height: "160px",
    color: "#fff",
    // textAlign: 'center',
    backgroundColor: "#252525",
    backdropFilter: "blur(10px)",
    borderRadius: "8px",
  };
  const [dotPosition, setDotPosition] = useState<DotPosition>("bottom");

  const { Meta } = Card;
  return (
    
    <Layouts>
      {contextHolder}
      <Card className="m-12 mx-52 drop-shadow-md  bg-sky-100 ">
        <Row>
          <Col span={14}>
            <Card className={`p-2 mr-3  ${loginStyle.cardLogin} no-border`}>
              <div className="container mt-3 ">
                <img src="/assets/icons.png" alt="" style={{ width: 60 }} />

                <div className="container my-12">
                  <h1 className="font-semibold text-2xl">
                    Experience unmatched luxury and exceptional hospitality at
                    our hotel.
                  </h1>
                  <p className="text-gray-600 mt-3">
                    Immerse yourself in a world of unrivaled sophistication and
                    impeccable service.
                  </p>
                </div>

                <div className="container ">
                  <Carousel autoplay dotPosition={dotPosition}>
                    <div>
                      {/* Pict 1 */}
                      <div style={contentStyle}>
                        <Row>
                          <div className="container mt-4 mx-6 mb-2 ">
                            <p>
                              "Being able to book a hotel without having to
                              physically go to the destination has made me more
                              efficient."
                            </p>
                          </div>
                        </Row>
                        <Row className="mt-1">
                          <Col className="ml-6">
                            <Avatar
                              size={45}
                              src="/img/loginpict/aryadi.jpeg"
                            />
                          </Col>
                          <Col className="ml-3">
                            <h1 className="font-semibold text-sm ">
                              Aryasa Miftah Mubaraq Siagian
                            </h1>
                            <p className="font-normal text-xs text-gray-400">
                              Quality Assurance
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    {/* Pict 2 */}
                    <div>
                      <div style={contentStyle}>
                        <Row>
                          <div className="container mt-4 mx-6 mb-2 ">
                            <p>
                              " I can easily book a hotel without any hassle and just one Click, that impresive me!"
                            </p>
                          </div>
                        </Row>
                        <Row className="mt-3">
                          <Col className="ml-6">
                            <Avatar size={45} src="/img/loginpict/poto2.jpg" />
                          </Col>
                          <Col className="ml-3 ">
                            <h1 className="font-semibold text-sm ">
                              Shoffie Anastasya
                            </h1>
                            <p className="font-normal text-xs text-gray-400">
                              Traveller
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    {/* Pict 3 */}
                    <div>
                      <div style={contentStyle}>
                      <Row>
                          <div className="container mt-4 mx-6 mb-2 ">
                            <p>
                              "The fast registration process makes it easy for me as someone who always wants things done quickly."
                            </p>
                          </div>
                        </Row>
                        <Row className="mt-2">
                          <Col className="ml-6">
                            <Avatar size={45} src="/img/loginpict/poto3.jpg" />
                          </Col>
                          <Col className="ml-3">
                            <h1 className="font-semibold text-sm ">
                              Reynaldi Renolds
                            </h1>
                            <p className="font-normal text-xs text-gray-400">
                              Influencer
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Carousel>
                </div>
              </div>
            </Card>
          </Col>
          {/* Form */}
          <Col className="ml-3">
            <div className="container mt-16 mb-12  ">
              <h1 className="text-3xl font-bold text-gray-700 mb-2">
                Welcome back.
              </h1>
              <p className="font-semibold text-gray-500">
                Login to your account now
              </p>
            </div>

            <Form 
            onFinish={onFinish}
            initialValues={{ remember: true }}
            >
              <label
                htmlFor="Email"
                className="block text-gray-500 font-semibold"
              >
                Email
              </label>
              <Form.Item
                name="email"
                className="mb-2"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  className="mt-1  px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-80"
                  placeholder=" Your Email"
                  maxLength={20}
                />
              </Form.Item>
              <label
                htmlFor="Password"
                className="block text-gray-500 font-semibold"
              >
                Password
              </label>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  type="password"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-80"
                  placeholder=" Your Password"
                />
              </Form.Item>
              <button
                type="submit"
                className="bg-[#252525] text-white px-4 py-3 my-2 rounded-lg font-medium w-80"
              >
                Login
              </button>
              <p className="text-gray-500 mx-12 mt-3 font-semibold">
                Don't have an account?
                <Link href="/users/register" className="ml-1 text-blue-700">
                  <motion.button
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   transition={{ duration: 0.2 }}
                  >
                  Sign Up
                  </motion.button>
                  </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Card>
    </Layouts>
  );
}

// primary /ungu: #754CFF
// sec  /abu-abu : #F2F1FA
// base /hitam : #252525
// aksen / kuning : #F7C934

// <Layouts>
// <div className="flex h-screen justify-center items-center bg-gray-100 py-8">
//  {contextHolder}
//  <Form className="bg-white p-10 rounded shadow-md padding"  initialValues={{ remember: true }}
//  onFinish={onFinish}>
//    <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
//    <p className="text-normal mb-5 font-light">Please enter your details</p>
//    <div className="mb-5">
//      <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address</label>
//      {/* <input type="email" id="email" name="email" placeholder="Enter your email address" className="px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline w-full" /> */}
//    <Form.Item
//      name="email"
//      rules={[{ required: true, message: "Please input your Email!" },]}>
//    <Input
//      className="px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline w-full"
//      placeholder=" Your Email"
//      maxLength={20}
//    />
//  </Form.Item>
//    </div>
//    <div className="mb-5">
//      <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
//      {/* <input type="password" id="password" name="password" placeholder="Enter your password" className="px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline w-full" /> */}
//      <Form.Item
//    name="password"
//    rules={[
//      { required: true, message: "Please input your Password!" },
//    ]}
//  >
//    <Input.Password
//      type="password"
//      className="px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline w-full"
//      placeholder=" Your Password"
//    />
//  </Form.Item>
//    </div>
//    <button type="submit" className="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full">Sign in</button>
//    <div className="flex justify-between mt-5">
//      <p  className="text-blue-500 hover:text-blue-700">Dont have an account?</p>
//      <Link href="/users/register" className="text-blue-500 hover:text-blue-700">Create Account</Link>
//    </div>
//  </Form>
// </div>
// </Layouts>

// <Content style={contentStyle}>
// {contextHolder}
// <Space size={10}>
//   <Card size="small">
//     <Meta title="SIGN IN TO YOUR ACCOUNT" style={{ marginTop: 30 }} />

//     <Form
//       name="normal_login"
//       className="login-form"
//       initialValues={{ remember: true }}
//       onFinish={onFinish}
//       style={{
//         marginTop: 30,
//         width: 300,
//         marginLeft: 100,
//         marginRight: 100,
//       }}
//     >
//       <Form.Item
//         name="email"
//         rules={[
//           { required: true, message: "Please input your Email!" },
//         ]}
//       >
//         <Input
//           prefix={<MailOutlined className="site-form-item-icon" />}
//           placeholder=" Your Email"
//           // onChange={eventHandler("email")}
//           maxLength={20}
//         />
//       </Form.Item>
//       <Form.Item
//         name="password"
//         rules={[
//           { required: true, message: "Please input your Password!" },
//         ]}
//       >
//         <Input.Password
//           prefix={<LockOutlined className="site-form-item-icon" />}
//           type="password"
//           placeholder=" Your Password"
//           // onChange={eventHandler("password")}
//         />
//       </Form.Item>
//       {/* <Form.Item>
//           <a className="login-form-forgot" href="">
//             Forgot password
//           </a>
//         </Form.Item> */}

//       <Button
//         htmlType="submit"
//         className="login-form-button mt-0"
//         // onClick={Logins}
//       >
//         Log in
//       </Button>
//       <Form.Item>
//         Don't have an account? <a href="">register now!</a>
//       </Form.Item>
//     </Form>
//   </Card>
// </Space>
// </Content>
