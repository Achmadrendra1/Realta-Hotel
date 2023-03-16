import Layouts from "@/layouts/layout";
import {
  doBankRequest,
  doPagaRequest,
  doUsacRequest,
} from "@/Redux/Action/Payment/paymentDashAction";
import withAuth from '@/PrivateRoute/WithAuth'
import { doGetUserOrder } from "@/Redux/Action/Resto/userOrderAction"; 
import {
  Breadcrumb,
  Button,
  Card,
  Col, 
  Form,
  Input, 
  Row, 
} from "antd";
import Head from "next/head"; 
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckSecure from "../payment/checkSecure";
import ActivationGoto from "../payment/activationGoto";
import ActivationHpay from "../payment/activationHpay";
import AddCard from "../payment/addCard";
import { doCreateTransaction, doGetAllBank } from "@/Redux/Action/Payment/paymentUserAction";

function Order({orderNumberUser}:any) {
  let dispatch = useDispatch();
  let router = useRouter();
  const userLoggedIn = useSelector((state: any) => state.GetUserReducer.getUser);
  const orderFromUser = useSelector((state:any)=> state.userOrderReducer.userOrder);  
  const orme = orderNumberUser.orderNumber;
  

  let [cart, setCart] = useState([]);
  let [result, setResult] = useState({
    ormeNumber: "",
    subtotal: 0,
    tax: 0,
    total: 0,
  });

  
  useEffect(() => {
    // get order number fom local storage
    const orderFromlocalstorage = localStorage.getItem("result");
    const parsedOrderNumber = orderFromlocalstorage !== null ? JSON.parse(orderFromlocalstorage) : []; 
    const notParsedCart = localStorage.getItem("cart");
    const parsedCart = notParsedCart ? JSON.parse(notParsedCart) : [];

    const userid = userLoggedIn[0]?.user_id; 
    setResult(parsedOrderNumber); 
    
    let data = {
      orderNumber: parsedOrderNumber.ormeNumber, 
    };

    dispatch(doGetUserOrder(orme));
  }, [orme]); 

  // BACK TO PREVIOUS PAGE
  function back() {
    router.back();
  }

  // ke halaman struk pembelian
  function goToBill() {
    router.push("bill");
  } 

  const [isActive, setIsActive] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  const [isCash, setIsCash] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [selectCard, setSelectCard] = useState({ accNumber: "", balance: "" });
  const [openAdd, setOpenAdd] = useState(false);
  const [showActivation, setShowActivation] = useState(false);
  const [showLinked, setShowLinked] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const { allBank } = useSelector((state: any) => state.payBankReducer);
  const { payPaga } = useSelector((state: any) => state.payPagaReducer);
  const user = useSelector((state: any) => state.GetUserReducer.getUser);
  const { account, error } = useSelector( (state: any) => state.payUserAccReducer);
  const accNumberDompet = `131${user[0]?.user_phone_number}`;
  const accNumberGoto = user[0]?.user_phone_number.slice(1);

  const [finalForm, setFinalForm] = useState({
    userId: 0,
    payType: "C", //Buat booking/resto
    amount: 0,
    sourceNumber: 0,
    targetNumber: 0,
    trxType: "ORM",
    secureCode: "",
    orderNumber: "",
  });

  useEffect(() => {
    setFinalForm({
      ...finalForm,
      amount: parseInt(orderFromUser[0]?.orme_total_amount.split(',')[0].replace(/[^0-9]/g, '')),
      orderNumber: orderFromUser[0]?.orme_order_number,
      trxType : 'ORM',
      userId: user[0]?.user_id
    })
  },[orderFromUser, user])

  const [payMsg, setPayMsg] = useState("");

  useEffect(() => {
    if (parseInt(selectCard.balance) < result.total) {
      setPayMsg(
        "Your Card Balance Is Insufficient, Please Check Or Select Another Card !"
      );
      setDisabled(true);
    } else {
      setPayMsg("");
      setDisabled(false);
    }
    if (selectCard.balance == "") {
      setPayMsg("");
      setDisabled(true);
    } 
  }, [selectCard, result.total]);


  const onComplete = () => {
    // console.log(finalForm);
    setShowCheck(true);
  };

  const onCompleteCash = () => {
    // console.log(finalForm);
    // alert(finalForm)
    dispatch(doCreateTransaction(finalForm));
    setTimeout(()=> router.push({
      pathname: `/restaurant/bill`,
      query: {id : finalForm.orderNumber},
    })
  , 1000);
  };

  const onClose = () => {
    setShowCheck(false);
  };

  useEffect(() => {
    dispatch(doGetAllBank());
    dispatch(doUsacRequest(user[0]?.user_id));
    dispatch(doPagaRequest());
  }, [user]);

  //Get User Account By User Id yang login
  // const userAcc = account?.filter(
  //   (obj: any) => obj.usacUserId === user[0]?.user_id
  // );
  //Di filter by Type buat misah antara bank/fintech
  const bankAcc = account?.filter(
    (obj: any) => obj.usacType === "Credit Card" || obj.usacType === "Debet"
  );
  const fintechAcc = account?.filter((obj: any) => obj.usacType === "Payment");

  //Check Status Account H-Pay
  const accDompet = fintechAcc?.find(
    (item: any) => item.usacAccountNumber == accNumberDompet
  );

  useEffect(() => {
    accDompet ? setIsActive(true) : setIsActive(false);
  }, [accDompet]);

  //Get Saldo H-Pay
  const saldoDompet = parseInt(accDompet?.usacSaldo).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  //Check Status Account GOTO
  const accGoto = fintechAcc?.find(
    (item: any) => item.usacAccountNumber == accNumberGoto
  );
  useEffect(() => {
    accGoto ? setIsLinked(true) : setIsLinked(false);
  }, [accGoto]);

  //Get Saldo H-Pay
  const saldoGoto = parseInt(accGoto?.usacSaldo).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const handleSetForm = (data: any) => {
    setFinalForm(data);
  };

  const handleClose = (data: boolean) => {
    setOpenAdd(data);
    setShowActivation(data);
    setShowLinked(data);
    setShowCheck(data);
  };

  const handleActive = (data: boolean) => {
    setOpenAdd(data);
    setShowActivation(data);
    setShowLinked(data);
    setShowCheck(data);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpenAdd(false);
      setShowActivation(false);
      setShowLinked(false);
      setShowCheck(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpenAdd(false);
    setShowActivation(false);
    setShowLinked(false);
    setShowCheck(false);
  };

  function maskCardNumber(cardNumber: number) {
    // Mengambil 4 digit terakhir
    const lastFourDigits = cardNumber.toString().slice(-4);
    // Mengganti semua digit, kecuali 4 digit terakhir, dengan karakter "*"
    const maskedDigits = cardNumber.toString().slice(8, -4).replace(/\d/g, "*");
    // Menggabungkan digit yang telah diubah dengan 4 digit terakhir
    const maskedCardNumber = `${maskedDigits} ${lastFourDigits}`;
    return maskedCardNumber;
  }
  let subtotal = 0;
  orderFromUser && orderFromUser.map((order:any) => {
    subtotal = subtotal +  parseInt(order.orme_subtotal.split(',')[0].replace(/[^0-9]/g, ''))
  })
 
  const total = parseInt(orderFromUser[0]?.orme_total_amount.split(',')[0].replace(/[^0-9]/g, ''))
  const tax = total-subtotal

  return (
    <>
      <Head>
        <title>Hotel App | Restaurant</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/Hotel_Icon.png" />
      </Head>
      <main>
        <Layouts>
          {openAdd ? (
            <AddCard
              show={openAdd}
              clickOk={handleOk}
              clickCancel={handleCancel}
              handleAct={handleActive}
              handleCancell={handleClose}
              dataUser={user}
              dataBank={allBank}
            />
          ) : null}
          {showActivation ? (
            <ActivationHpay
              show={showActivation}
              clickOk={handleOk}
              clickCancel={handleCancel}
              handleCancell={handleClose}
              phone={accNumberDompet}
              dataUser={user}
              dataPaga={payPaga}
            />
          ) : null}
          {showLinked ? (
            <ActivationGoto
              show={showLinked}
              clickOk={handleOk}
              clickCancel={handleCancel}
              handleCancell={handleClose}
              phone={accNumberGoto}
              dataUser={user}
              dataPaga={payPaga}
            />
          ) : null}
          {showCheck ? (
            <CheckSecure
              show={showCheck}
              clickOk={handleOk}
              clickCancel={handleCancel}
              handleCancell={handleClose}
              dataPayment={finalForm}
              // dataBooking={dataBooking}
            />
          ) : null}
          <div className="container mx-auto">
            <Breadcrumb className="pb-5">
              <Breadcrumb.Item>
                <a href="/restaurant">Restaurant</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a onClick={back}>Menu</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Order</Breadcrumb.Item>
            </Breadcrumb>
            <div className="lg:flex">
              <div className="lg:w-3/5 sm:full sm:mb-4 border rounded-lg bg-white shadow p-6 lg:mr-4">
                <p className="text-2xl font-semibold">Enter Your Details</p>
                <p className="pb-5">
                  We will use these details to share your order information
                </p>
                <Form layout="vertical">
                  <Form.Item label={"Fullname"}>
                    <Input
                      placeholder="fullname"
                      value={userLoggedIn[0]?.user_full_name}
                      readOnly
                    ></Input>
                  </Form.Item>
                  <Form.Item label={"E-mail"}>
                    <Input
                      placeholder="e-mail"
                      value={userLoggedIn[0]?.user_email}
                      readOnly
                    ></Input>
                  </Form.Item>
                  <Form.Item label={"No Handphone"}>
                    <Input
                      placeholder="hp"
                      value={userLoggedIn[0]?.user_phone_number}
                      readOnly
                    ></Input>
                  </Form.Item>
                </Form>
                <p className="text-2xl">Payment</p>
                <p className="text-red-600 text-center text-sm">{payMsg}</p>
                <div className=" w-11/12 p-4 mb-4">
                  <Row gutter={16}>
                    <Col span={8}>
                      <Card
                        size="small"
                        className={`m-4 font-bold text-[14px] ${
                          isCash ? "bg-[#754cff] text-white" : ""
                        }`}
                        hoverable
                        onClick={() => {
                          setIsCash(true),
                            setSelectCard({ accNumber: "", balance: "" });
                          setFinalForm({
                            ...finalForm,
                            payType: "C",
                            sourceNumber: 0,
                            targetNumber: 0,
                          });
                        }}
                      >
                        Cash
                      </Card>
                      <Card
                        size="small"
                        className={`m-4 font-bold text-[14px] ${
                          !isCash ? "bg-[#754cff] text-white" : ""
                        }`}
                        hoverable
                        onClick={() => {
                          setIsCash(false),
                            setSelectCard({ accNumber: "", balance: "" });
                          setFinalForm({
                            ...finalForm,
                            sourceNumber: 0,
                            targetNumber: 0,
                            secureCode: "",
                          });
                        }}
                      >
                        Pay Now
                      </Card>
                    </Col>
                    <Col span={16}>
                      {isCash ? (
                        <div className="w-full text-center mt-6">
                          <div>
                            <p className="text-lg font-semibold">
                              No payment is needed at the moment.
                            </p>
                            <p>
                              Your order will be confirmed without any
                              additional fee. Please pay directly at the
                              restaurant when you arrive.
                            </p>
                          </div>
                          <Button
                            onClick={onCompleteCash}
                            className="mt-6 bg-[#754cff] rounded-full text-white w-full h-10"
                          >
                            Complete Order
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-6 w-full ">
                          <p className="m-4">Fintech</p>
                          {isActive ? (
                            <Card
                              size={"small"}
                              className={`mb-2 ${
                                selectCard.accNumber ===
                                  accDompet?.usacAccountNumber &&
                                "bg-[#754cff] text-white"
                              }`}
                              hoverable
                              onClick={() => {
                                setSelectCard({
                                  accNumber: accDompet?.usacAccountNumber,
                                  balance: accDompet?.usacSaldo,
                                });
                                setFinalForm({
                                  ...finalForm,
                                  sourceNumber: accDompet?.usacAccountNumber,
                                  targetNumber: 13198989898,
                                  payType: "PG",
                                });
                              }}
                            >
                              <div className="flex justify-between items-center px-6">
                                <p className="text-[16px] font-semibold">
                                  H-Pay
                                </p>
                                <p className="text-[16px] font-semibold">
                                  {saldoDompet}
                                </p>
                              </div>
                            </Card>
                          ) : (
                            <Card size={"small"} className="mb-2">
                              <div className="flex justify-between items-center px-6">
                                <p className="text-[16px] font-semibold">
                                  H-Pay
                                </p>
                                <p
                                  className={`${
                                    selectCard.accNumber ===
                                    accDompet?.usacAccountNumber
                                      ? "text-white"
                                      : "text-blue-700"
                                  } hover:cursor-pointer`}
                                  onClick={() => setShowActivation(true)}
                                >
                                  Activate
                                </p>
                              </div>
                            </Card>
                          )}

                          {isLinked ? (
                            <Card
                              size={"small"}
                              className={`mb-2 ${
                                selectCard.accNumber ===
                                  accGoto?.usacAccountNumber &&
                                "bg-[#754cff] text-white"
                              }`}
                              hoverable
                              onClick={() => {
                                setSelectCard({
                                  accNumber: accGoto?.usacAccountNumber,
                                  balance: accGoto?.usacSaldo,
                                });
                                setFinalForm({
                                  ...finalForm,
                                  sourceNumber: accGoto?.usacAccountNumber,
                                  targetNumber: 13198989898,
                                  payType: "PG",
                                });
                              }}
                            >
                              <div className="flex justify-between px-6">
                                <p className="text-[16px] font-semibold">
                                  GOTO
                                </p>
                                <p className="text-[16px] font-semibold">
                                  {saldoGoto}
                                </p>
                              </div>
                            </Card>
                          ) : (
                            <Card size={"small"} className="mb-2">
                              <div className="flex justify-between px-6">
                                <p className="text-[16px] font-semibold">
                                  GOTO
                                </p>
                                <p
                                  className={`${
                                    selectCard.accNumber ===
                                    accGoto?.usacAccountNumber
                                      ? "text-white"
                                      : "text-blue-700"
                                  } hover:cursor-pointer`}
                                  onClick={() => setShowLinked(true)}
                                >
                                  Link Account
                                </p>
                              </div>
                            </Card>
                          )}

                          <p className="m-4">Debet/Credit Card</p>
                          {bankAcc.map((item: any) => (
                            <Card
                              size={"small"}
                              className={`mb-2 ${
                                selectCard.accNumber ===
                                  item.usacAccountNumber &&
                                "bg-[#754cff] text-white"
                              }`}
                              hoverable
                              onClick={() => {
                                setSelectCard({
                                  accNumber: item.usacAccountNumber,
                                  balance: item.usacSaldo,
                                });
                                setFinalForm({
                                  ...finalForm,
                                  payType:
                                    item.usacType == "Debet" ? "D" : "CR",
                                  sourceNumber: item.usacAccountNumber,
                                  targetNumber: 13198989898,
                                  trxType: "",
                                  secureCode: "",
                                  orderNumber: "",
                                });
                              }}
                            >
                              <div className="flex justify-between px-6">
                                <p className="text-[16px] font-semibold">
                                  {maskCardNumber(item.usacAccountNumber)}
                                </p>
                                <p>
                                  {
                                    allBank?.find(
                                      (obj: any) =>
                                        obj.bankEntityId == item.usacEntityId
                                    )?.bankName
                                  }{" "}
                                  - {item.usacType}
                                </p>
                              </div>
                            </Card>
                          ))}

                          <p
                            className="mt-2 px-2 cursor-pointer text-[#754cff]"
                            onClick={() => setOpenAdd(true)}
                          >
                            Add New Card
                          </p>
                          <Button
                            disabled={disabled}
                            onClick={onComplete}
                            className="mt-6 bg-[#754cff] rounded-full text-white w-full h-12"
                          >
                            Complete Order
                          </Button>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="lg:w-2/5 sm:w-full border rounded-lg shadow bg-white p-3 sticky top-0 h-1/2 ">
                <p className="text-center text-2xl font-semibold mt-3">
                  Order Summary
                </p>
                <p className="font-semibold py-4 text-center">{orme}</p>
                {orderFromUser &&
                  orderFromUser.map((order: any) => (
                    <div className="border rounded-lg p-2 shadow-md flex my-2" >
                      {/* <img src={`${configuration.BASE_URL}/${order.rempurl}`} alt='cake' width={120} height={120}>
                      </img> */}
                      <div className="ml-3 mt-1 w-full">
                        <div className="flex">
                          <p className="font-bold w-4/5 text-lg">
                            {order.reme_name}
                          </p>
                        </div>

                        <p>
                          {order.orme_price}
                          <span className="text-red-400 ml-4">
                            x {order.orme_qty}
                          </span>
                        </p>
                        <p className="mb-2 text-[14px] text-right mr-4">
                          Subtotal: {order.orme_subtotal}
                        </p>
                      </div>
                    </div>
                  ))}
                <div className="w-full mx-auto bg-slate-200 rounded-lg my-4 p-4">
                  <p className="font-bold text-center text-xl py-4">
                    Payment Summary
                  </p>
                  <table className="w-full">
                    <tbody>
                      <tr className="">
                        <td className="w-full">Sub total</td>
                        <td className="text-right">
                          {subtotal.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </td>
                      </tr>
                      {/* <tr className='hover:bg-slate-300'>
                          <td>Discount [dapet dr manaa?]</td>
                          <td className='text-right'>Rp.0</td>
                        </tr> */}
                      <tr>
                        <td className=" py-2">Tax(11%)</td>
                        <td className="text-right">
                          {tax.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td className=" py-2">Total payment</td>
                        <td className="text-right">
                          {orderFromUser[0]?.orme_total_amount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <a onClick={goToBill}>
                    <div className="border rounded-lg bg-slate-100 my-5 text-center font-bold py-2 hover:bg-slate-300">
                      Complete Your Request
                    </div>
                  </a> */}
                  {/* <div className="flex-col">
                    <p>{finalForm.amount + " Amount"} </p>
                    <p>{finalForm.sourceNumber + " Source"} </p>
                    <p>{finalForm.targetNumber + " Target"} </p>
                    <p>{finalForm.payType + " pay"} </p>
                    <p>{finalForm.orderNumber + " order number"} </p>
                    <p>{finalForm.trxType + " trxtype"} </p>
                    <p>{finalForm.userId + " userID"}</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </Layouts>
      </main>
    </>
  );
}

export default withAuth(Order)

export async function getServerSideProps(context: any) {
  const { query } = context;
  const {
    orderNumber
  } = query;

  const orderNumberUser = {
    orderNumber
  };

  return {
    props: {
      orderNumberUser,
    },
  };
}