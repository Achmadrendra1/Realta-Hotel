import { getSpInvoice } from "@/Redux/Action/Booking/BookingAction";
import Buttons from "@/components/Button";
import { LeftCircleOutlined, LeftOutlined } from "@ant-design/icons";
import { Col, Divider, QRCode, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function index() {
  let root = useRouter();
  const { id } = root.query || {};
  const dispatch = useDispatch();

  const router = useRouter()

  const invoiceView = useSelector(
    (state: any) => state.BoorInvoiceReducer.invoice
  );

  useEffect(() => {
    dispatch(getSpInvoice());
  }, [id]);

  const Invoice = invoiceView?.filter(
    (item: any) => item.boor_order_number == id
  );
  const boor_order_number =
    Invoice?.length > 0 ? Invoice[0].boor_order_number : "";
  const boor_order_date = Invoice?.length > 0 ? Invoice[0].boor_order_date : "";
  const boor_is_paid = Invoice[0]?.boor_is_paid;
  const boor_pay_type = Invoice?.length > 0 ? Invoice[0].boor_pay_type : "";
  const user_full_name = Invoice?.length > 0 ? Invoice[0].user_full_name : "";
  const user_phone_number =
    Invoice?.length > 0 ? Invoice[0].user_phone_number : "";
  const usme_memb_name = Invoice?.length > 0 ? Invoice[0].usme_memb_name : "";
  const usme_promote_date =
    Invoice?.length > 0 ? Invoice[0].usme_promote_date : "";
  const usme_points = Invoice?.length > 0 ? Invoice[0].usme_points : 0;
  const faci_name = Invoice?.length > 0 ? Invoice[0].faci_name : "";
  const boor_total_room = Invoice?.length > 0 ? Invoice[0].boor_total_room : 0;
  const borde_adults = Invoice?.length > 0 ? Invoice[0].borde_adults : 0;
  const borde_kids = Invoice?.length > 0 ? Invoice[0].borde_kids : 0;
  const borde_price = Invoice?.length > 0 ? Invoice[0].borde_price : "";
  const borde_discount = Invoice?.length > 0 ? Invoice[0].borde_discount : "";
  const borde_subtotal = Invoice?.length > 0 ? Invoice[0].borde_subtotal : "";
  const inv_number = Invoice?.length > 0 ? Invoice[0].patr_trx_id : "";
  const inv_date = Invoice?.length > 0 ? Invoice[0].patr_modified_date : "";

  const [getInvoice, setGetinvoice] = useState({
    boor_order_number: "",
    boor_order_date: "",
    invoice_number: "",
    invoice_date: "",
    boor_is_paid: "",
    boor_pay_type: "",
    user_full_name: "",
    user_phone_number: "",
    usme_memb_name: "",
    usme_promote_date: "",
    usme_points: 0,
    faci_name: "",
    boor_total_room: 0,
    borde_adults: 0,
    borde_kids: 0,
    borde_price: "",
    borde_discount: "",
    borde_subtotal: "",
  });

  useEffect(() => {
    setGetinvoice({
      ...getInvoice,
      boor_order_number: boor_order_number,
      boor_order_date: boor_order_date,
      boor_is_paid: boor_is_paid,
      boor_pay_type: boor_pay_type,
      user_full_name: user_full_name,
      user_phone_number: user_phone_number,
      usme_memb_name: usme_memb_name,
      usme_promote_date: usme_promote_date,
      usme_points: usme_points,
      faci_name: faci_name,
      boor_total_room: boor_total_room,
      borde_adults: borde_adults,
      borde_kids: borde_kids,
      borde_price: borde_price,
      borde_discount: borde_discount,
      borde_subtotal: borde_subtotal,
      invoice_number: inv_number,
      invoice_date: inv_date,
    });
  }, [boor_order_number]);

  // console.log(getInvoice);

  // const email = "aryasamiftah@gmail.com"

  // const handleEmailClick = () => {
  //   window.location.href = `mailto:${email}`;
  // };

  //Array Object untuk title and field
  const invoice1 = [
    {
      title: "Booking Order",
      field: getInvoice.boor_order_number,
    },
    {
      title: "Order Date",
      field: getInvoice.boor_order_date?.split("T")[0],
    },
    {
      title: "Invoice Number",
      field: getInvoice.invoice_number,
    },
    {
      title: "Invoice Date",
      field: getInvoice.invoice_date?.split("T")[0],
    },
    {
      title: "Status",
      field: getInvoice.boor_is_paid,
    },
    {
      title: "Payment Type",
      field: getInvoice?.boor_pay_type,
    },
  ];

  const invoice2 = [
    {
      title: "Full Name",
      field: getInvoice.user_full_name,
    },
    {
      title: "Contact Number",
      field: getInvoice.user_phone_number,
    },
    {
      title: "Member",
      field: getInvoice.usme_memb_name,
    },
    {
      title: "Member Date",
      field: getInvoice.usme_promote_date?.split("T")[0],
    },
    {
      title: "Remaining Points",
      field: getInvoice.usme_points,
    },
  ];

  return (
    <>
      <div className="px-6 pt-4 flex justify-between">
        <Link href={"/booking"} className="text-xl mb-5">
          <LeftCircleOutlined /> Kembali
        </Link>
        <div className="mr-12 flex justify-end">
          <div className="mr-2">
            <Buttons funcs={''}>Print</Buttons>
          </div>
          <div>
            <Buttons funcs={""}>Send To Email</Buttons>
          </div>
        </div>
      </div>

      <div id="invoice" className=" w-11/12 shadow-lg m-auto p-4">
        <h1 className="text-2xl mb-3 font-bold">Invoice {id}</h1>

        <Row>
          {invoice1.map((item: any, index: any) => (
            <Col span={4} key={index}>
              <p className="text-lg font-semibold mb-1">{item.title}</p>
              <p className="text-md">{item.field}</p>
            </Col>
          ))}
        </Row>
        <Divider dashed style={{ borderColor: "black" }} />

        <h1 className="text-2xl mb-3 font-bold">Customer </h1>

        <Row>
          {invoice2.map((item: any, index: any) => (
            <Col span={4} key={index}>
              <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
              <h3 className="text-md">{item.field}</h3>
            </Col>
          ))}
        </Row>
        <Divider dashed style={{ borderColor: "black" }} />

        <h1 className="text-2xl mb-3 font-bold">Billing </h1>

        <Row className="flex">
          <Col span={4} className="flex">
            <div>
              <h2 className="text-lg font-semibold mb-1">Facilities</h2>
              <h3 className="text-md">{getInvoice.faci_name}</h3>
            </div>
          </Col>
          <Col span={4} className="flex">
            <div>
              <h2 className="text-lg font-semibold mb-1">Qty</h2>
              <h3 className="text-md">{getInvoice.boor_total_room}</h3>
            </div>
          </Col>
          <Col span={4} className="flex">
            <div>
              <h2 className="text-lg font-semibold mb-1">Total Guests</h2>
              <h3 className="text-md">
                {getInvoice.borde_adults} Adults {getInvoice.borde_kids} Kids
              </h3>
            </div>
          </Col>
          <Col span={4} className="flex">
            <div>
              <h2 className="text-lg font-semibold mb-1">Price</h2>
              <h3 className="text-md">{getInvoice.borde_price}</h3>
            </div>
          </Col>
          <Col span={4} className="flex">
            <div>
              <h2 className="text-lg font-semibold mb-1">Discount</h2>
              <h3 className="text-md">{getInvoice.borde_discount}</h3>
            </div>
          </Col>
          <Col span={4} className="flex">
            <div>
              <h2 className="text-lg font-semibold mb-1">Sub Total</h2>
              <h3 className="text-md">{getInvoice.borde_subtotal}</h3>
            </div>
          </Col>
        </Row>
        <Divider dashed style={{ borderColor: "black" }} />
        <div className="w-10/12 flex justify-between items-center">
          <QRCode value={id} size={96} className="ml-14" />
          <div className="w-1/4">
            <div className="flex justify-between min-w-[350px]">
              <h2 className="flex text-lg font-semibold mb-1 mr-5">
                Total Amount
              </h2>
              <h2 className="flex text-lg font-semibold mb-1">
                {getInvoice.borde_subtotal}
              </h2>
            </div>
            <div className="flex justify-between min-w-[350px]">
              <h2 className="flex text-lg font-semibold mb-1 mr-5">
                Payment Amount
              </h2>
              <h2 className="flex text-lg font-semibold mb-1">
                {getInvoice.borde_subtotal}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
