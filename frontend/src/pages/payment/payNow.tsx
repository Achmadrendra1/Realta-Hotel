import Layouts from "@/layouts/layout";
import {
  Button,
  Card,
  Col,
  Drawer,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import AddCard from "./addCard";
import { useDispatch, useSelector } from "react-redux";
import {
  doBankRequest,
  doPagaRequest,
  doUsacRequest,
} from "@/Redux/Action/Payment/paymentDashAction";
import ActivationHpay from "./activationHpay";
import ActivationGoto from "./activationGoto";
import Item from "antd/es/list/Item";
import CheckSecure from "./checkSecure";
import Buttons from "@/components/Button";

export default function pay() {
  const dispacth = useDispatch();
 
  const [isActive, setIsActive] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  const [isCash, setIsCash] = useState(true);
  const [disabled, setDisaled] = useState(true);
  const [selectCard, setSelectCard] = useState("");
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
    payType: "", //Buat booking/resto
    amount: "",
    sourceNumber: "",
    targetNumber: "",
    trxType: "",
    secureCode: "",
    orderNumber: "",
  });

  useEffect(() => {
    setFinalForm({ ...finalForm, userId: user[0]?.user_id });
  }, [user]);

  useEffect(() => {
    if (finalForm.payType != "") {
      setDisaled(false);
    } else {
      setDisaled(true);
    }
  }, [finalForm]);

  const onComplete = () => {
    // console.log(finalForm);
    setShowCheck(true);
  };

  const onCompleteCash = () => {
    // console.log(finalForm)
  }

  const onClose = () => {
    setShowCheck(false);
  };

  useEffect(() => {
    dispacth(doBankRequest());
    // dispacth(doUsacRequest());
    dispacth(doPagaRequest());
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

  const handleSetForm = (data:any) => {
    setFinalForm(data)
  }

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
          data={finalForm}
          handleSet = {handleSetForm}
        />
      ) : null}
      <Row gutter={12}>
        <Col span={10} className="">
          <div className="w-full h-screen bg-white drop-shadow-lg">
            <p>{finalForm.payType}</p>
            <p>{finalForm.sourceNumber}</p>
            <p>{finalForm.targetNumber}</p>
            <p>{finalForm.secureCode}</p>
          </div>
        </Col>
        <Col span={14}>
          <div className="border-2 w-full h-screen p-8">
            <Row gutter={16}>
              <Col span={8}>
                <Card
                  size="small"
                  className="m-4 font-bold text-[14px]"
                  hoverable
                  onClick={() => {
                    setIsCash(true),
                      setFinalForm({
                        ...finalForm,
                        payType: "C",
                        sourceNumber: "0",
                        targetNumber: "0",
                      });
                  }}
                >
                  Cash
                </Card>
                <Card
                  size="small"
                  className="m-4 font-bold text-[14px]"
                  hoverable
                  onClick={() => {
                    setIsCash(false), setSelectCard("");
                    setFinalForm({
                      ...finalForm,
                      payType: "",
                      amount: "",
                      sourceNumber: "",
                      targetNumber: "",
                      trxType: "",
                      secureCode: "",
                      orderNumber: "",
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
                        We will confirm your stay without any charge. Pay
                        directly at the hotel during your stay.
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
                          selectCard === accDompet?.usacAccountNumber &&
                          "bg-slate-500 text-white"
                        }`}
                        hoverable
                        onClick={() => {
                          setSelectCard(accDompet?.usacAccountNumber),
                            setFinalForm({
                              ...finalForm,
                              sourceNumber: accDompet?.usacAccountNumber,
                              targetNumber: "13198989898",
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
                      <Card size={"small"}>
                        <div className="flex justify-between items-center px-6">
                          <p className="text-[16px] font-semibold">
                            H-Pay
                          </p>
                          <p
                            className={`${
                              selectCard === accDompet?.usacAccountNumber
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
                        selectCard === accGoto?.usacAccountNumber &&
                        "bg-slate-500 text-white"
                      }`}
                      hoverable
                      onClick={() =>
                        isLinked
                          ? setSelectCard(accGoto?.usacAccountNumber)
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
                              selectCard === accGoto?.usacAccountNumber
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
                          selectCard === item.usacAccountNumber &&
                          "bg-slate-500 text-white"
                        }`}
                        hoverable
                        onClick={() => {
                          setSelectCard(item.usacAccountNumber),
                            setFinalForm({
                              ...finalForm,
                              payType: item.usacType == "Debet" ? "D" : "CR", //Buat booking/resto
                              amount: "",
                              sourceNumber: item.usacAccountNumber,
                              targetNumber: "13198989898",
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
        </Col>
      </Row>
    </Layouts>
  );
}
