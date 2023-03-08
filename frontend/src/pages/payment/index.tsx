import Layouts from "@/layouts/layout";
import {
  CreditCardOutlined,
  DollarCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Empty, List, Row } from "antd";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ActivationHpay from "./activationHpay";
import { useDispatch, useSelector } from "react-redux";
import {
  doBankRequest,
  doPagaRequest,
  doTransactionRequest,
  doUsacRequest,
} from "@/Redux/Action/Payment/paymentDashAction";
import { doGetHistory } from "@/Redux/Action/Payment/paymentUserAction";
import withAuth from "@/PrivateRoute/WithAuth";
import Buttons from "@/components/Button";

export default withAuth(function index() {
  const dispacth = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [isOpenAct, setOpenAct] = useState(false);
  const [isEmpty, setEmpty] = useState(false);

  const user = useSelector((state: any) => state.GetUserReducer.getUser);
  const { payBank } = useSelector((state: any) => state.payBankReducer);
  const { payPaga } = useSelector((state: any) => state.payPagaReducer);
  const { payDashTrx, total, currentPage, payHistoryTrx } = useSelector(
    (state: any) => state.payTrxHistoryReducer
  );
  const { account, error } = useSelector(
    (state: any) => state.payUserAccReducer
  );
  const accNumberDompet = `131${user[0]?.user_phone_number}`;
  const accNumberGoto = user[0]?.user_phone_number;

  useEffect(() => {
    dispacth(doBankRequest());
    dispacth(doPagaRequest());
    dispacth(doGetHistory());
  }, []);

  // Filter History By User
  const dataTrx = payHistoryTrx?.filter(
    (obj: any) => obj.userId === user[0]?.user_id
  );
 

  //Get User Account By User Id yang login
  // const userAcc = account?.filter(
  //   (obj: any) => obj.usacUserId === user[0]?.user_id
  // );
  //Di filter by Type buat misah antara bank/fintech
  const bankAcc = account?.filter(
    (obj: any) => obj.usacType === "Credit Card" || obj.usacType === "Debet"
  );
  const fintechAcc = account?.filter((obj: any) => obj.usacType === "Payment");

  //Check Status Account Dompet Realta
  const accDompet = fintechAcc?.find(
    (item: any) => item.usacAccountNumber == accNumberDompet
  );

  useEffect(() => {
    accDompet ? setIsActive(true) : setIsActive(false);
  }, [accDompet]);

  //Get Saldo Dompet Realta
  const saldoDompet = parseInt(accDompet?.usacSaldo).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleOk = () => {
    setTimeout(() => {
      setOpenAct(false);
      // setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenAct(false);
  };

  const handleActive = (data: boolean) => {
    setIsActive(data);
  };
  const handleCancell = (data: boolean) => {
    setOpenAct(data);
  };
  // console.log(dataTrx);
  const { RangePicker } = DatePicker;
  return (
    <>
      <Head>
        <title>Hotel App - Payment</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/Hotel_Icon.png" />
      </Head>
      <main>
        <Layouts>
          {isOpenAct ? (
            <ActivationHpay
              show={isOpenAct}
              clickOk={handleOk}
              clickCancel={handleCancel}
              handleAct={handleActive}
              handleCancell={handleCancell}
              phone={accNumberDompet}
              dataUser={user}
              dataPaga={payPaga}
            />
          ) : null}
          <div className="relative w-full h-60 justify-center p-4 bg-[#4728ae] text-[#F2F1FA] m-auto rounded-xl bg-center bg-cover bg-no-repeat flex mb-6">
            <div className="p-4 flex justify-center w-full pl-28 pr-28">
              <Row gutter={16} className="w-full ">
                <Col span={12} className="pt-4 ml-28">
                  <p className="text-white text-2xl font-bold">
                    Easy Your Transactions with H-Pay
                  </p>
                  <p className="text-white text-sm flex-wrap">
                    Get started with H-Pay for Hotels today and experience the
                    future of travel payments. Book your next stay with ease and
                    enjoy a stress-free travel experience.
                  </p>
                  <Button className="text-white mt-4 hover:text-white hover:border-[#F7C934]">
                    Learn More
                  </Button>
                </Col>
                <Col>
                  <img src="/assets/payment.png" className="h-auto w-40" />
                </Col>
              </Row>
              <div className="absolute w-3/4 bg-white rounded-lg drop-shadow-lg py-6 px-8 m-auto mt-44">
                <Row gutter={16} className="flex justify-around items-center">
                  <Col
                    span={12}
                    className="p-4 border-0 hover:border-r-2 hover:cursor-pointer"
                  >
                    {isActive ? (
                      <Link href={"payment/hpay"}>
                        <Row gutter={8}>
                          <Col>
                            <DollarCircleOutlined className="text-xl mt-2 mr-2 text-[#4728ae]" />
                          </Col>
                          <Col span={16}>
                            <p className="text-md text-[#4728ae] font-bold">
                              H-Pay Balance
                            </p>
                            <p className="text-md text-gray-700">
                              {saldoDompet}
                            </p>
                          </Col>
                          <Col>
                            <RightOutlined className="text-xl mt-2 text-[#4728ae]" />
                          </Col>
                        </Row>
                      </Link>
                    ) : (
                      <div className="text-center">
                        <p className="text-lg text-[#4728ae] font-bold">
                          Activate Seamless Transactions with H-Pay Now!
                        </p>
                        <div className="mt-2">
                          <Buttons
                            // className="mt-2"
                            funcs={() => setOpenAct(true)}
                          >
                            Activate H-Pay Now!
                          </Buttons>
                        </div>
                      </div>
                    )}
                  </Col>
                  <Col
                    span={12}
                    className="p-4 border-0 hover:border-l-2 hover:cursor-pointer"
                  >
                    <Link href={"payment/cards"}>
                      <Row gutter={8} className="flex items-center">
                        <Col>
                          <CreditCardOutlined className="text-xl mt-2 mr-2 text-[#4728ae]" />
                        </Col>
                        <Col span={16}>
                          <p className="text-md text-[#4728ae] font-bold">
                            My Cards
                          </p>
                          {bankAcc.length <= 0 ? (
                            <p className="text-gray-700">Add Your Card Here</p>
                          ) : (
                            <p className="text-md text-gray-700">
                              {bankAcc.length} Cards
                            </p>
                          )}
                        </Col>
                        <Col>
                          <RightOutlined className="text-xl mt-2 text-[#4728ae]" />
                        </Col>
                      </Row>
                    </Link>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className="mt-32 mb-6 drop-shadow-lg m-auto border-b-md rounded-md ">
            <div className="flex justify-between p-6 bg-white rounded-lg">
              <p className="text-lg font-semibold text-[#252525]">
                History Transaction
              </p>
              <RangePicker />
            </div>
            <List
              className="pb-4"
              pagination={{
                total: total,
                pageSize: 10,
                
              }}
            >
              {dataTrx.length != 0 ? (
                dataTrx.map((item: any) => (
                  <Card
                    title={item.transactionNumber}
                    extra={item.trxDate?.split("T")[0]}
                    className="m-4"
                  >
                    <div>
                      <div className="flex justify-between">
                        <p className="font-bold text-lg">
                          {item.transactionNote}
                        </p>
                        {item.debit != 0 ? (
                          <p className="text-md text-green-600 font-semibold">
                            {parseInt(item.debit).toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </p>
                        ) : (
                          <p className="text-md text-red-600 font-semibold">
                            {parseInt(item.credit).toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <p className="text-md">
                          {item.orderNumber
                            ? item.orderNumber
                            : "Dompet Realta"}
                        </p>
                        <p className="text-md font-semibold">
                          {item.sourcePaymentName == null
                            ? "Cash"
                            : item.sourcePaymentName}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Empty className="mt-10 font-bold text-xl"/>
              )}
            </List>
          </div>
        </Layouts>
      </main>
    </>
  );
});
