import Buttons from "@/components/Button";
import {
  ArrowRightOutlined,
  CreditCardOutlined,
  DeleteFilled,
  Loading3QuartersOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
  RightCircleOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  List,
  Row,
  Tag,
  Tooltip,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import ActivationHpay from "./activationHpay";
import AddCard from "./addCard";
import Link from "next/link";
import TopUp from "./topup";
import { useDispatch, useSelector } from "react-redux";
import {
  doBankRequest,
  doPagaRequest,
  doUsacRequest,
} from "@/Redux/Action/Payment/paymentDashAction";
import ActivationGoto from "./activationGoto";
import DetCard from "./detCard";
import DetailCard from "./detailCard";
import { randomBytes } from "crypto";
import { doGetAllBank } from "@/Redux/Action/Payment/paymentUserAction";

export default function MyAccount() {
  const dispacth = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [isActive, setIsActive] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  const [showActivation, setShowActivation] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [dataCard, setDataCard] = useState();
  const user = useSelector((state: any) => state.GetUserReducer.getUser);
  const { allBank } = useSelector((state: any) => state.payBankReducer);
  const { payPaga } = useSelector((state: any) => state.payPagaReducer);
  const { account, error } = useSelector(
    (state: any) => state.payUserAccReducer
  );
  const accNumberDompet = `131${user[0]?.user_phone_number}`;
  const accNumberGoto = user[0]?.user_phone_number.slice(1);

  useEffect(() => {
    dispacth(doGetAllBank());
    // dispacth(doUsacRequest());
    dispacth(doPagaRequest());
  }, []);

  useEffect(() => {
    if (error !== null) {
      messageApi
        .open({
          type: "loading",
          content: "loading....",
          duration: 1,
        })
        .then(() => message.error(error, 2));
    }
  }, [error]);

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

  const handleClose = (data: boolean) => {
    setShowActivation(data);
    setShowLink(data);
    setShowAddCard(data);
    setShowTopUp(data);
    setShowDetail(data)
  };

  const handleActive = (data: boolean) => {
    setShowActivation(data);
    setShowLink(data);
    setShowAddCard(data);
    setShowTopUp(data);
    setShowDetail(data)
  };

  const handleOk = () => {
    setTimeout(() => {
      setShowActivation(false);
      setShowLink(false);
      setShowAddCard(false);
      setShowTopUp(false);
      setShowDetail(false)
    }, 2000);
  };

  const handleCancel = () => {
    // console.log("Clicked cancel button");
    setShowActivation(false);
    setShowLink(false);
    setShowAddCard(false);
    setShowTopUp(false);
    setShowDetail(false)
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
    <div>
      {contextHolder}
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
      {showLink ? (
        <ActivationGoto
          show={showLink}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleCancell={handleClose}
          phone={accNumberGoto}
          dataUser={user}
          dataPaga={payPaga}
        />
      ) : null}
      {showAddCard ? (
        <AddCard
          show={showAddCard}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleAct={handleActive}
          handleCancell={handleClose}
          dataUser={user}
          dataBank={allBank}
        />
      ) : null}
      {showTopUp ? (
        <TopUp
          show={showTopUp}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleAct={handleActive}
          handleCancell={handleClose}
          phone={accNumberDompet}
          card = {bankAcc}
          dataUser={user}
        />
      ) : null}
      {showDetail ? (
        <DetailCard
          show={showDetail}
          clickOk={handleOk}
          clickCancel={handleCancel}
          handleAct={handleActive}
          handleCancell={handleClose}
          data = {dataCard}
          dataBank={allBank}
        />
      ) : null}
      <Card title="Fintech" className="mb-4">
        <List>
          <List.Item>
            <Card className="w-full">
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="text-xl font-bold">H-Pay</p>
                  <div className="flex mt-2">
                    <p>{accNumberDompet}</p>
                    {isActive ? (
                      <Tag className="ml-4 rounded-lg" color="green">
                        Active
                      </Tag>
                    ) : (
                      <Tag className="ml-4 rounded-lg" color="red">
                        Inactive
                      </Tag>
                    )}
                  </div>
                </div>
                {isActive ? (
                  <div className="min-w-[125px]">
                    <div className="flex justify-between">
                      <p>Balance</p>
                      <div>
                        <Tooltip title="Top Up">
                          <PlusCircleOutlined
                            onClick={() => {
                              setShowTopUp(true);
                            }}
                            className="mt-1 hover:text-sky-600"
                          />
                        </Tooltip>
                        <Tooltip title="Show More">
                          <Link href={'/payment'}>
                          <RightCircleOutlined
                            className="mt-1 ml-2 hover:text-sky-600"
                          />
                          </Link>
                        </Tooltip>
                      </div>
                    </div>
                    <p className="text-lg font-bold">{saldoDompet}</p>
                  </div>
                ) : (
                  <div>
                    <p
                      onClick={() => {
                        setShowActivation(true);
                      }}
                      className="text-[#754cff] text-[14px] font-semibold hover:cursor-pointer"
                    >
                      Activate
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </List.Item>
        </List>
        <List>
          <List.Item>
            <Card className="w-full">
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="text-xl font-bold">GOTO</p>
                  <div className="flex mt-2">
                    <p>{accNumberGoto}</p>
                    {isLinked ? (
                      <Tag className="ml-4 rounded-lg" color="green">
                        Active
                      </Tag>
                    ) : (
                      <Tag className="ml-4 rounded-lg" color="red">
                        Inactive
                      </Tag>
                    )}
                  </div>
                </div>
                {isLinked ? (
                  <div className="min-w-[125px]">
                    <p>Balance</p>
                    <p className="text-lg font-bold">{saldoGoto}</p>
                  </div>
                ) : (
                  <div>
                    <p
                      
                      onClick={() => {
                        setShowLink(true);
                      }}
                      className="text-[#754cff] text-[14px] font-semibold hover:cursor-pointer"
                    >
                      Link Account
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </List.Item>
        </List>
      </Card>
      <Card
        title="Debet/Credit Card"
        extra={
          <Buttons
            funcs={() => {
              setShowAddCard(true);
            }}
          >
            Add
          </Buttons>
        }
      >
        {bankAcc.length != 0 ? bankAcc.map((item: any) => (
          <Card
            size="small"
            hoverable
            className="m-2"
            onClick={() => {setShowDetail(true), setDataCard(item)}}
          >
            <div className="flex justify-between items-center mx-4">
              <div>
              <p className="font-bold text-lg">
                {maskCardNumber(item.usacAccountNumber)}
              </p>
              <p>{`${item.usacExpmonth}/${item.usacExpyear}`}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-md text-blue-600">
                  {item.usacType}
                </p>
                <p className="font-bold text-lg">
                  {
                    allBank?.find(
                      (obj: any) => obj.bankEntityId == item.usacEntityId
                    )?.bankName
                  }
                </p>
              </div>
            </div>
          </Card>
        )) : <Empty className="mt-10 font-bold text-xl" />}
      </Card>
    </div>
  );
}
