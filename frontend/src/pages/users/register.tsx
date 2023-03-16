import { doAddDataUser } from "@/Redux/Action/User/GetDataUser";
import { Avatar, Card, Carousel, Col, Form, Input, Row } from "antd";
import { DotPosition } from "antd/es/carousel";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Auth from "@/PrivateRoute/Auth";
import loginStyle from "@/styles/login.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

export default Auth ( function Register(): any {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const  router = useRouter();

  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    if (password !== confirmPassword) {
      setError("Password do not match");
      setTimeout(() => {}, 5000);
    } else {
      console.log("Success:", values);
      dispatch(doAddDataUser(values));
      router.push("/users/login")
    }
  };

  const contentStyle: React.CSSProperties = {
    height: "160px",
    color: "#fff",
    backgroundColor: "#FFFFFF",
    backdropFilter: "blur(10px)",
    borderRadius: "8px",
  };
  const [dotPosition, setDotPosition] = useState<DotPosition>("bottom");

  return (
    <>
    <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      
    >
    <div className="bg-[#f2f1fa] pt-12 h-screen">
      
    <Card className=" mx-52 drop-shadow-md  bg-[#754CFF] ">
      <Row>
      
        {/* Form */}
        <Col span={10}>
          <div className="container m-5">
            <div className="container mt-7 mb-3  ">
              <h1 className="text-3xl font-bold text-white mb-2">
                Get Started.
              </h1>
              <p className="font-semibold text-white">
                Create your account now
              </p>
            </div>

          <Form 
          onFinish={onFinish}
          initialValues={{ remember: true }}
          >
            <label
              htmlFor="Name"
              className="block text-white font-semibold"
            >
              Fullname
            </label>
            <Form.Item
              name="userFullName"
              className="mb-2"
              rules={[
                { required: true, message: "Please input your Name!" },
              ]}
            >
              <Input
                className="mt-1  px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-80"
                placeholder="Your Fullname"
                maxLength={20}
              />
            </Form.Item>

            <label
              htmlFor="Email"
              className="block text-white font-semibold"
            >
              Email
            </label>
            <Form.Item
              name="userEmail"
              className="mb-2"
              rules={[
                { required: true, message: "Please input your Email!" },
              ]}
            >
              <Input
                className="mt-1  px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-80"
                placeholder="Your Email"
              />
            </Form.Item>

            <label
              htmlFor="Phone Number"
              className="block text-white font-semibold"
            >
              Phone Number
            </label>
            <Form.Item
              name="userPhoneNumber"
              className="mb-2"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}
            >
              <Input
                className="mt-1  px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-80"
                placeholder="Your Phone Number"
              />
            </Form.Item>

            <label
              htmlFor="Password"
              className="block text-white font-semibold"
            >
              Password
            </label>
            <Form.Item
              name="UserPassword"
              className="mb-2"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-80"
                placeholder=" Your Password"
              />
            </Form.Item>

            <label
              htmlFor="Password"
              className="block text-white font-semibold"
            >
              Confirm Password
            </label>
            <Form.Item
              name="ConfirmPassword"
              rules={[
                { required: true, message: "Re-type your Password!" },
              ]}
            >
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 w-80"
                placeholder=" Your Password"
              />
            </Form.Item>
            {error && <div  className="error text-red-600 mb-2" >{error}</div>}
            <button
              type="submit"
              className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-3 my-2 rounded-lg font-medium w-80"
            >
              Sign Up
            </button>
            <p className="text-white mx-16 mt-3 font-semibold">
              Have an account?
              <Link href="/users/login" className="ml-1 text-[#F7C934]">Sign In</Link>
            </p>
          </Form>
          </div>
       
        </Col>
        <Col span={14} >
        <p className="mt-4 mr-2 font-bold text-end text-lg text-white hover:cursor-pointer"><CloseOutlined onClick={() => {router.push('/')}}/></p>

          <Card className={`p-2 ml-5 mr-3 mt-6 ${loginStyle.cardLogin} no-border`}>
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
      </Row>
    </Card>
    </div>
  </motion.div>
  </>
  );
})
// primary /ungu: #754CFF
// sec  /abu-abu : #F2F1FA
// base /hitam : #252525
// aksen / kuning : #F7C934