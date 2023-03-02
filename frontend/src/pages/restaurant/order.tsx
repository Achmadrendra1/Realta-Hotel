import Layouts from "@/layouts/layout";
import {
  doBankRequest,
  doPagaRequest,
  doUsacRequest,
} from "@/Redux/Action/Payment/paymentDashAction";
import { doGetUserOrder } from "@/Redux/Action/Resto/userOrderAction";
import { configuration } from "@/Redux/Configs/url";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckSecure from "../payment/checkSecure";
import ActivationGoto from "../payment/activationGoto";
import ActivationHpay from "../payment/activationHpay";
import AddCard from "../payment/addCard";
import { doCreateTransaction } from "@/Redux/Action/Payment/paymentUserAction";

export default function Order() {
  let dispatch = useDispatch();
  let router = useRouter();
  const userLoggedIn = useSelector(
    (state: any) => state.GetUserReducer.getUser
  );
  const orderFromUser = useSelector(
    (state: any) => state.userOrderReducer.userOrder
  )

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
    const parsedOrderNumber =
      orderFromlocalstorage !== null ? JSON.parse(orderFromlocalstorage) : [];

    const notParsedCart = localStorage.getItem("cart");
    const parsedCart = notParsedCart ? JSON.parse(notParsedCart) : [];

    const userid = userLoggedIn[0]?.user_id;
    setCart(parsedCart);
    setResult(parsedOrderNumber);
    let data = {
      ormeNumber: parsedOrderNumber.ormeNumber,
      userId: userid,
    };

    dispatch(doGetUserOrder(data));
  }, []);

  // let userOrder = useSelector((state:any) => state.userOrderReducer.userOrder);

  // console.log('orderNumber', userOrder[0].orme_order_number);

  // payment versi soffie
  const [payType, setPayType] = useState("cash");

  function paymentType(e: any) {
    if (e.target.value === "card") setPayType("card");
    else setPayType("cash");
  }

  // BACK TO PREVIOUS PAGE
  function back() {
    router.back();
  }

  // ke halaman struk pembelian
  function goToBill() {
    router.push("bill");
  }
  // --------------------- PAYMENT DR RENRA

  // //State untuk menampilkan payment
  // const [payment, setPayment] = useState(false);
  // const [payMsg, setPayMsg] = useState('');

  // const [isCash, setIsCash] = useState(true);

  // const [dataOrder, setDataOrder] = useState({
  //   ormePayType: ''
  // })

  // const [dataPayment, setDataPayment] = useState({
  //   userId: 0,
  //   amount: 0,
  //   sourceNumber: "",
  //   targetNumber: "",
  //   trxType: "TRB",
  //   secureCode: "",
  //   orderNumber: "",
  // });

  // const [selectCard, setSelectCard] = useState({accNumber : '', balance : ''});
  // const onCompleteCash = () => {
  //   console.log(dataPayment)
  //   // dispatch(insertBooking(dataBooking));
  // };

  // useEffect(()=>{

  //   setDataPayment({ ...dataPayment, userId: userLoggedIn[0]?.user_id });
  // },[])

  const [isActive, setIsActive] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  const [isCash, setIsCash] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [selectCard, setSelectCard] = useState({ accNumber: "", balance: "" });
  const [openAdd, setOpenAdd] = useState(false);
  const [showActivation, setShowActivation] = useState(false);
  const [showLinked, setShowLinked] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const { payBank } = useSelector((state: any) => state.payBankReducer);
  const { payPaga } = useSelector((state: any) => state.payPagaReducer);
  const user = useSelector((state: any) => state.GetUserReducer.getUser);
  const { account, error } = useSelector(
    (state: any) => state.payUserAccReducer
  );
  const accNumberDompet = `131${user[0]?.user_phone_number}`;
  const accNumberGoto = user[0]?.user_phone_number;

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
      amount: result.total,
      orderNumber: result.ormeNumber,
      trxType : 'ORM'
    })
  },[result, finalForm])

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

  useEffect(() => {
    setFinalForm({ ...finalForm, userId: user[0]?.user_id });
  }, [user]);

  const onComplete = () => {
    console.log(finalForm);
    setShowCheck(true);
  };

  const onCompleteCash = () => {
    console.log(finalForm);
    // alert(finalForm)
    dispatch(doCreateTransaction(finalForm));
    setTimeout(()=> router.push("bill"))
  };

  const onClose = () => {
    setShowCheck(false);
  };

  useEffect(() => {
    dispatch(doBankRequest());
    dispatch(doUsacRequest());
    dispatch(doPagaRequest());
  }, []);

  //Get User Account By User Id yang login
  const userAcc = account?.filter(
    (obj: any) => obj.usacUserId === user[0]?.user_id
  );
  //Di filter by Type buat misah antara bank/fintech
  const bankAcc = userAcc?.filter(
    (obj: any) => obj.usacType === "Credit Card" || obj.usacType === "Debet"
  );
  const fintechAcc = userAcc?.filter((obj: any) => obj.usacType === "Payment");

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

  //Check Status Account GOTO
  const accGoto = fintechAcc?.find(
    (item: any) => item.usacAccountNumber == accNumberGoto
  );
  useEffect(() => {
    accGoto ? setIsLinked(true) : setIsLinked(false);
  }, [accGoto]);

  //Get Saldo Dompet Realta
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
          dataBank={payBank}
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
          phone={user[0]?.user_phone_number}
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
            <div className="flex">
              <div className="w-3/5 border rounded shadow p-3 mr-2">
                <p className="text-2xl">Enter your details</p>
                <p className="pb-5">
                  We will use these detais to share your order information
                </p>
                <Form layout="vertical">
                  <Form.Item label={"Fullname"}>
                    <Input
                      placeholder="fullname"
                      value={userLoggedIn[0]?.user_full_name}
                    ></Input>
                  </Form.Item>
                  <Form.Item label={"E-mail"}>
                    <Input
                      placeholder="e-mail"
                      value={userLoggedIn[0]?.user_email}
                    ></Input>
                  </Form.Item>
                  <Form.Item label={"No Handphone"}>
                    <Input
                      placeholder="hp"
                      value={userLoggedIn[0]?.user_phone_number}
                    ></Input>
                    {/* <Input.Group compact>
                        <Select defaultValue="+62" style={{ width: '30%' }}>
                          <Select.Option value="+1">+1 (USA)</Select.Option>
                          <Select.Option value="+44">+44 (UK)</Select.Option>
                          <Select.Option value="+62">+62 (Indonesia)</Select.Option>
                        </Select>
                      <Input style={{ width: '70%' }} placeholder="Nomor Telepon" />
      
                      </Input.Group> */}
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
                          isCash ? "bg-blue-600 text-white" : ""
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
                          !isCash ? "bg-blue-600 text-white" : ""
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
                            className="mt-6 bg-blue-600 text-white w-full h-10"
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
                                "bg-slate-500 text-white"
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
                                  Dompet Realta
                                </p>
                                <p className="text-[16px] font-semibold">
                                  {saldoDompet}
                                </p>
                              </div>
                            </Card>
                          ) : (
                            <Card size={"small"}>
                              <div className="flex justify-between items-center px-6">
                                <p className="text-[16px] font-semibold">
                                  Dompet Realta
                                </p>
                                <p
                                  className={`${
                                    selectCard.accNumber ===
                                    accDompet?.usacAccountNumber
                                      ? "text-white"
                                      : "text-blue-700"
                                  }`}
                                  onClick={() => setShowActivation(true)}
                                >
                                  Activate
                                </p>
                              </div>
                            </Card>
                          )}

                          <Card
                            size={"small"}
                            className={`mb-2 ${
                              selectCard.accNumber ===
                                accGoto?.usacAccountNumber &&
                              "bg-slate-500 text-white"
                            }`}
                            hoverable
                            onClick={() =>
                              isLinked
                                ? setSelectCard({
                                    accNumber: accGoto?.usacAccountNumber,
                                    balance: accGoto?.usacSaldo,
                                  })
                                : ""
                            }
                          >
                            <div className="flex justify-between px-6">
                              <p className="text-[16px] font-semibold">GOTO</p>
                              {isLinked ? (
                                <p className="text-[16px] font-semibold">
                                  {saldoGoto}
                                </p>
                              ) : (
                                <p
                                  className={`${
                                    selectCard.accNumber ===
                                    accGoto?.usacAccountNumber
                                      ? "text-white"
                                      : "text-blue-700"
                                  }`}
                                  onClick={() => setShowLinked(true)}
                                >
                                  Link Account
                                </p>
                              )}
                            </div>
                          </Card>

                          <p className="m-4">Debet/Credit Card</p>
                          {bankAcc.map((item: any) => (
                            <Card
                              size={"small"}
                              className={`mb-2 ${
                                selectCard.accNumber ===
                                  item.usacAccountNumber &&
                                "bg-slate-500 text-white"
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
                                    payBank?.find(
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
                            className="mt-2 px-2 cursor-pointer"
                            onClick={() => setOpenAdd(true)}
                          >
                            Add New Card
                          </p>
                          <Button
                            disabled={disabled}
                            onClick={onComplete}
                            className="mt-6 bg-blue-600 text-white w-full h-12"
                          >
                            Complete Order
                          </Button>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="w-2/5 border rounded shadow p-3 mr-2">
                <p className="text-center text-2xl font-bold">Summary Order</p>
                <p className="text-m py-4">Order Number {result.ormeNumber}</p>
                {orderFromUser &&
                  orderFromUser.map((order: any) => (
                    <div className="border rouded shadow mt-5 my-5 hover:bg-slate-100 flex">
                      {/* <img src={`${configuration.BASE_URL}/${order.rempurl}`} alt='cake' width={120} height={120}>
                      </img> */}
                      <div className="ml-3 mt-1 w-full">
                        <div className="flex">
                          <p className="font-bold w-4/5">
                            {order.reme_name}
                            <span className="text-red-400 ml-4">
                              x {order.orme_qty}
                            </span>
                          </p>
                        </div>
                        {/* <p>{order.desc}</p> */}
                        <p>{order.orme_price}</p>
                        <p>Subtotal: {order.orme_subtotal}</p>
                      </div>
                    </div>
                  ))}
                <div>
                  <table className="py-5 bg-slate-100 w-full">
                    <p className="font-bold text-center py-4">
                      Payment Summary
                    </p>
                    <tbody>
                      <div className="p-4">
                        <tr className="hover:bg-slate-300">
                          <td className="w-full">Sub total</td>
                          <td className="text-right">
                            {result.subtotal.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </td>
                        </tr>
                        {/* <tr className='hover:bg-slate-300'>
                          <td>Discount [dapet dr manaa?]</td>
                          <td className='text-right'>Rp.0</td>
                        </tr> */}
                        <tr className="hover:bg-slate-300">
                          <td className=" py-2">Tax(11%)</td>
                          <td className="text-right">
                            {result.tax.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </td>
                        </tr>
                        <tr className="font-bold hover:bg-slate-300">
                          <td className=" py-2">Total payment</td>
                          <td className="text-right">
                            {result.total.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </td>
                        </tr>
                      </div>
                    </tbody>
                  </table>
                  {/* <a onClick={goToBill}>
                    <div className="border rounded-lg bg-slate-100 my-5 text-center font-bold py-2 hover:bg-slate-300">
                      Complete Your Request
                    </div>
                  </a> */}
                  <div className="flex-col">
                    <p>{finalForm.amount + " Amount"} </p>
                    <p>{finalForm.sourceNumber + " Source"} </p>
                    <p>{finalForm.targetNumber + " Target"} </p>
                    <p>{finalForm.payType + " pay"} </p>
                    <p>{finalForm.orderNumber + " order number"} </p>
                    <p>{finalForm.trxType + " trxtype"} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layouts>
      </main>
    </>
  );
}
