import Layouts from "@/layouts/layout";
import { doGetUserOrder } from "@/Redux/Action/Resto/userOrderAction";
import { Breadcrumb, Divider, QRCode } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Bill() {
  let router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const orderFromUser = useSelector(
    (state: any) => state.userOrderReducer.userOrder
  );
  
  useEffect(() => {
    dispatch(doGetUserOrder(id));
  }, [id]);

  // back page
  function back() {
    router.back();
  }
  function back2() {
    router.back();
    router.back();
  }
  const subTotal = parseInt(orderFromUser[0]?.orme_subtotal.split(',')[0].replace(/[^0-9]/g, ''))
  const total = parseInt(orderFromUser[0]?.orme_total_amount.split(',')[0].replace(/[^0-9]/g, ''))
  const tax = total-subTotal
  console.log(orderFromUser)
  return (
    <>
      <Layouts>
        <Breadcrumb className="pb-5">
          <Breadcrumb.Item>
            <a href="/restaurant">Restaurant</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a onClick={back2}>Menu</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a onClick={back}>Order</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div className="w-2/6 mt-4 mb-6 bg-white border rounded-2xl shadow-lg p-4 mx-auto">
          <p className="text-xl text-center font-bold uppercase">
            Item Ordered
          </p>
          <p className="text-lg font-semibold text-center uppercase">
            Hotel Realta
          </p>
          <div className="flex justify-center mt-2">
            <QRCode value={orderFromUser[0]?.orme_order_number} size={96} />
          </div>
          <div className="mt-2 ml-6 font-semibold">
            <div className="flex">
              <p className="min-w-[110px]">Order Number</p>
              <p>: {orderFromUser[0]?.orme_order_number}</p>
            </div>
            <div className="flex">
              <p className="min-w-[110px]">Invoice Number</p>
              <p>: {orderFromUser[0]?.trx_number}</p>
            </div>
            <div className="flex">
              <p className="min-w-[110px]">Payment Type</p>
              <p>
                :{" "}
                {orderFromUser[0]?.payment_type == null
                  ? "Cash"
                  : orderFromUser[0]?.payment_type}
              </p>
            </div>
          </div>
          <Divider className="border-2 bg-black" />
          {orderFromUser.map((order: any, index: number) => (
            <div key={index} className="flex items-center">
              <div className=" mt-1 w-full ml-5">
                <div className="flex">
                  <p className="font-bold w-4/5 text-lg">
                    {order.reme_name}
                  </p>
                </div>
                <p className="flex ml-6 items-center">
                  {order.orme_price}{" "}
                  <span className="text-red-400 ml-4"> x {order.orme_qty}</span>
                  <span className="ml-2 flex">
                    <p className="ml-4 font-semibold text-lg">
                      = {order.orme_subtotal}
                    </p>
                  </span>
                </p>
              </div>
            </div>
          ))}
          <Divider className="border-2 bg-black" />
          <div className="mt-6 mx-4">
            <p className="font-bold text-center text-lg mb-4">
              Payment Summary
            </p>
            <table className="py-5 w-full">
              <tbody>
                <tr className="">
                  <td className="w-full">Sub total</td>
                  <td className="text-right">
                    {orderFromUser[0]?.orme_subtotal}
                  </td>
                </tr>
                <tr className="">
                  <td className=" py-2">Tax(11%)</td>
                  <td className="text-right">{tax.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}</td>
                </tr>
                <tr className="font-bold">
                  <td className=" py-2">Total payment</td>
                  <td className="text-right">
                    {orderFromUser[0]?.orme_total_amount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Layouts>
    </>
  );
}
