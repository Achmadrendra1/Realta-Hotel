import { doDeleteAccount } from "@/Redux/Action/Payment/paymentUserAction";
import Buttons from "@/components/Button";
import { Button, Card, Col, Input, Modal, Row, Select } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function DetailCards(props: any) {
  const dispatch = useDispatch()
  const { data, dataBank, handleCancell } = props;
  function maskCardNumber(cardNumber: number) {
    // Mengambil 4 digit terakhir
    const lastFourDigits = cardNumber.toString().slice(-4);
    // Mengganti semua digit, kecuali 4 digit terakhir, dengan karakter "*"
    const maskedDigits = cardNumber
      .toString()
      .slice(0, -4)
      .replace(/\d{4}/g, (str) => `${str} `)
      .replace(/\d/g, "*");
    // Menggabungkan digit yang telah diubah dengan 4 digit terakhir
    const maskedCardNumber = `${maskedDigits} ${lastFourDigits}`;
    return maskedCardNumber;
  }

  const handleDelete = (accNumber:any)=>{
    // console.log(accNumber)
    dispatch(doDeleteAccount(accNumber))
    handleCancell(false)
  }
  return (
    <>
      <Modal
        title="Detail Card"
        open={props.show}
        onOk={props.clickOk}
        onCancel={props.clickCancel}
        centered
        footer={null}
      >
        {/* <div className="h-44 w-80 m-auto mt-4 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <Card bordered={true} hoverable className="bg-blue-200">
            <div className="flex justify-between datas-center">
              <p className="font-semibold">
                {
                  dataBank?.find(
                    (obj: any) => obj.bankEntityId == data.usacEntityId
                  )?.bankName
                }
              </p>
              <p className="font-semibold text-right">{data.usacType}</p>
            </div>

            <p className="text-2xl font-bold mt-4">
              {maskCardNumber(data.usacAccountNumber)}
            </p>

            <div className="flex justify-between mt-6 items-center">
              <div>
                <p className="text-[12px]">Valid Date :</p>
                <p className="font-semibold">{`${data.usacExpmonth}/${data.usacExpyear}`}</p>
              </div>
              <div>
                <p className="text-[12px]">Balance</p>
              <p className="font-semibold">
                {parseInt(data.usacSaldo).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
              </div>
            </div>
          </Card>
        </div> */}
          <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-xl transition-transform transform hover:scale-95">
                      <img
                        className="relative object-cover w-full h-full rounded-xl"
                        src={
                          data.usacType == "Debet"
                            ? "https://i.imgur.com/kGkSg1v.png"
                            : "https://i.imgur.com/Zi6v09P.png"
                        }
                      />

                      <div className="w-full px-8 absolute top-8">
                        <div className="flex justify-between">
                          <div className="">
                            <p className="font-semiBold text-lg">{dataBank.find((obj:any) => obj.bankEntityId == data.usacEntityId)?.bankName}</p>
                          </div>
                          <p className="font-semibold text-lg">
                            {data.usacType}
                          </p>
                        </div>
                        <div className="pt-8">
                          <p className="font-medium tracking-more-wider text-3xl">
                            {maskCardNumber(data.usacAccountNumber)}
                          </p>
                        </div>
                        <div className="mt-8">
                          <div className="flex justify-between">
                            <div className="">
                              <p className="font-light text-xs">Exp :</p>
                              <p className="font-medium tracking-wider text-sm">
                                {`${data.usacExpmonth}/${data.usacExpyear}`}
                              </p>
                            </div>
                            <div className="min-w-[120px]">
                              <p className="font-light text-xs">
                                Balance :
                              </p>
                              <p className="font-medium tracking-wider text-sm">
                                {parseInt(data.usacSaldo).toLocaleString(
                                  "id-ID",
                                  {
                                    style: "currency",
                                    currency: "IDR",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
        <div className="text-center mt-6">
          <Buttons funcs={()=>handleDelete(data.usacAccountNumber)} type={"danger"}>
            DELETE CARD
          </Buttons>
        </div>
      </Modal>
    </>
  );
}
