import { doAddDataUser } from "@/Redux/Action/User/GetDataUser";
import { Avatar, Card, Carousel, Col, Form, Input, Layout, Row } from "antd";
import { DotPosition } from "antd/es/carousel";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import loginStyle from "@/styles/login.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Layouts from "@/layouts/layout";

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
      // console.log("Success:", values);
      dispatch(doAddDataUser(values));
      window.location.href = "/users/login";
    }
  };

  const contentStyle: React.CSSProperties = {
    height: "160px",
    color: "#fff",
    backgroundColor: "#252525",
    backdropFilter: "blur(10px)",
    borderRadius: "8px",
  };
  const [dotPosition, setDotPosition] = useState<DotPosition>("bottom");

  return (
    <Layouts>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      
    >
    <Card className="m-12 mx-52 drop-shadow-md  bg-sky-100 ">
      <Row>
        {/* Form */}
        <Col span={10}>
          <div className="container m-5">
            <div className="container mt-7 mb-3  ">
              <h1 className="text-3xl font-bold text-gray-700 mb-2">
                Get Started.
              </h1>
              <p className="font-semibold text-gray-500">
                Create your account now
              </p>
            </div>

          <Form 
          onFinish={onFinish}
          initialValues={{ remember: true }}
          >
            <label
              htmlFor="Name"
              className="block text-gray-500 font-semibold"
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
              className="block text-gray-500 font-semibold"
            >
              Email
            </label>
            <Form.Item
              name="useEmail"
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
              className="block text-gray-500 font-semibold"
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
              className="block text-gray-500 font-semibold"
            >
              Password
            </label>
            <Form.Item
              name="UserPassword"
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
              Sign Up
            </button>
            <p className="text-gray-500 mx-16 mt-3 font-semibold">
              Have an account?
              <Link href="/users/login" className="ml-1 text-blue-700">Sign In</Link>
            </p>
          </Form>
          </div>
       
        </Col>
        <Col span={14} >
          <Card className={`p-2 ml-5 mr-3  ${loginStyle.cardLogin} no-border`}>
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
      </Row>
    </Card>
  </motion.div>
  </Layouts>
  );
}
