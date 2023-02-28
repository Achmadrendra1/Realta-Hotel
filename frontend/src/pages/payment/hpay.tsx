import Layouts from "@/layouts/layout";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import Head from "next/head";
import Link from "next/link";
import {use, useState} from 'react';
import TopUp from './topup'
import DetailTransHpay from "./detailTransHpay";

export default function hpay() {
  const addIcon = (
    <svg
      stroke-width="0"
      fill="#FFF"
      width="24"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z"></path>
        <path
          stroke="#FFF"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 14V6a2 2 0 0 1 2-2h14v4h2v10a2 2 0 0 1-2 2h-8"
        ></path>
        <path
          stroke="#FFF"
          stroke-width="2"
          d="M14 12h7v4h-7a2 2 0 1 1 0-4z"
        ></path>
        <path
          stroke="#FFF"
          stroke-linecap="round"
          stroke-width="2"
          d="M6 8h13M6 15v6M3 18h6"
        ></path>
      </g>
    </svg>
  );

  const [isOpenTP, setOpenTP] = useState(false)
  const [isOpenDetail, setOpenDetail] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [msg, setMsg] = useState('')
  const handleOk = () => {
    setMsg('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenTP(false);
      setOpenDetail(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpenTP(false);
    setOpenDetail(false)
  };

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
          <div className="relative w-full h-48 drop-shadow-lg p-4 bg-blue-700 m-auto rounded-xl bg-center bg-cover bg-no-repeat mb-6">
            <div className="flex justify-start mb-8">
              <Link href={'/payment'}><LeftOutlined className="text-lg text-white mr-4" /></Link>
              <p className="pt-px text-lg text-white font-bold">
                H-Pay Balance
              </p>
            </div>
            <div className="w-2/4 h-36 mt-4 m-auto p-6 bg-white rounded-lg">
              <div className="flex justify-between">
                <div>
                  <p className="text-md">Balance</p>
                  <p className="text-3xl mt-2 font-bold">Rp. 0</p>
                </div>
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white px-4 flex"
                  onClick={()=>{setOpenTP(true)}}
                >
                  {addIcon}
                  <p className="ml-2 text-md hover:text-white"> Top Up </p>
                </Button>
              </div>
            </div>
          </div>
          
          <div className=" w-3/4 m-auto mt-12">
          <div className="flex justify-center m-auto mb-2">
            <Card style={{ width: 250 }} className="bg-white mr-4">
              <p className="text-md font-bold">In</p>
              <p className="text-green-600">Rp. 500.000</p>
            </Card>
            <Card style={{ width: 250 }} className=" bg-white">
              <p className="text-md font-bold">Out</p>
              <p >Rp. 500.000</p>
            </Card>
          </div>
              <Card title="History Transaction">
                <Card
                  type="inner"
                  title="TP#20230123-0001"
                  extra={'23-01-2023'}
                  className="mb-4"
                >
                  <div>
                  <p className="font-bold text-lg">Top Up</p>
                  <p className="text-md">H-Pay User</p>
                  <p className="text-right text-md text-green-600">Rp. 500.000</p>
                  </div>
                </Card>
                <Card
                  type="inner"
                  title="TRB#20230123-0001"
                  extra={'23-01-2023'}
                  className="mb-4"
                >
                  <div>
                  <p className="font-bold text-lg">Booking Order BO#20230123-0002</p>
                  <p className="text-md">Hotel ABC</p>
                  <p className="text-right text-md text-red-600">Rp. 500.000</p>
                  </div>
                </Card>
                <Card
                  type="inner"
                  title="RF#20230123-0001"
                  extra={'23-01-2023'}
                  className="mb-4 hover:cursor-pointer"
                  onClick={()=>setOpenDetail(true)}
                >
                  <div>
                  <p className="font-bold text-lg">Refund BO#20230123-0002</p>
                  <p className="text-right text-md text-green-600">Rp. 500.000</p>
                  </div>
                </Card>
              </Card>
          </div>
          {isOpenTP ? <TopUp show={isOpenTP} clickOk={handleOk} clickCancel={handleCancel}/> : null}
          {isOpenDetail ? <DetailTransHpay show={isOpenDetail} clickOk={handleOk} clickCancel={handleCancel}/> : null}
        </Layouts>
      </main>
    </>
  );
}