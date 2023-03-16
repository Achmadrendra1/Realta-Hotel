import Auth from "@/PrivateRoute/Auth";
import { doLogin } from "@/Redux/Action/User/auth";
import loginStyle from "@/styles/login.module.css";
import { CloseOutlined } from "@ant-design/icons";
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
import { motion } from 'framer-motion';
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default Auth( function Login() {
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
    // console.log("Success:", values);
    dispatch(doLogin(values));
  };

  const contentStyle: React.CSSProperties = {
    height: "160px",
    color: "#252525",
    // textAlign: 'center',
    backgroundColor: "#FFFFFF",
    backdropFilter: "blur(10px)",
    borderRadius: "8px",
  };
  const [dotPosition, setDotPosition] = useState<DotPosition>("bottom");

  const { Meta } = Card;
  const router = useRouter()

  return (
    <>
      {contextHolder}
      <div className="bg-[#f2f1fa] h-screen p-3  ">
      <Card className="mx-80 drop-shadow-md bg-[#8662FF] rounded-3xl mt-28">
      
        <Row gutter={16}>
          <Col span={14}>
         
            <Card className={`p-2 mr-3]  ${loginStyle.cardLogin} no-border`}>
              <div className="container mt-3 ">
                <img src="/assets/icons.png" alt="" style={{ width: 60 }} />

                <div className="container my-12">
                  <h1 className="font-semibold text-2xl text-white">
                    Experience unmatched luxury and exceptional hospitality at
                    our hotel.
                  </h1>
                  <p className="text-[#252525] mt-3">
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
                            <p className="text-[#000000]">
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
                              src="/img/loginpict/hola.jpg"
                            />
                          </Col>
                          <Col className="ml-3">
                            <h1 className="font-semibold text-sm text-[#000000] ">
                              Abraham Winchester
                            </h1>
                            <p className="font-normal text-xs text-[#000000]">
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
                          <div className="container mt-4 mx-6 mb-2 text-[#000000]">
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
                            <h1 className="font-semibold text-sm text-[#000000] ">
                              Shoffie Anastasya
                            </h1>
                            <p className="font-normal text-xs text-[#000000]">
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
                          <div className="container mt-4 mx-6 mb-2 text-[#000000] ">
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
                            <h1 className="font-semibold text-sm text-[#000000] ">
                              Reynaldi Renolds
                            </h1>
                            <p className="font-normal text-xs text-[#000000]">
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
          <p className="mt-4 mr-2 font-bold text-end text-lg text-white hover:cursor-pointer"><CloseOutlined onClick={() => {router.push('/')}}/></p>
            <div className="container mt-16 mb-12">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back.
              </h1>
              <p className="font-semibold text-white">
                Login to your account now
              </p>
            </div>

            <Form 
            onFinish={onFinish}
            initialValues={{ remember: true }}
            >
              <label
                htmlFor="Email"
                className="block text-white font-semibold"
              >
                Email
              </label>
              <Form.Item
                name="email"
                className="mb-2 "
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
                className="block text-white font-semibold"
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
                className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-3 my-2 rounded-lg font-medium w-80"
              >
                Login
              </button>
              <p className="text-white mx-12 mt-3 font-semibold">
                Don't have an account?
                <Link href="/users/register" className="ml-1 text-[#F7C934]">
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
      </div>
    </>
  );
})